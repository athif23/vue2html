import plugins from './plugins';
import {
    isVueFile,
    getComponentName,
    parseStrToFunc,
    convertSlash,
    copyFirstComponent
} from './utils';

const { rollup } = require('rollup');
const path = require('path');
const fs = require('fs-extra');

export default async function(filenames, options = {}) {
    if (!filenames) {
        return;
    }

    let vueComponents;
    let imports = '';

    // This is default options
    const defaultOptions = {
        props: {},
        plugins: [],
        tailwind: false,
        purge: false
    };

    // Extend default options
    Object.assign(defaultOptions, options);

    if (Array.isArray(filenames)) {
        vueComponents = filenames.map(file => {
            return {
                name: getComponentName(file),
                isVue: isVueFile(file),
                path: convertSlash(
                    path.relative(path.resolve(__dirname, '../template'), file)
                ),
                resolvePath: path.resolve(file)
            };
        });
    } else {
        const component = {
            name: getComponentName(filenames),
            isVue: isVueFile(filenames),
            path: convertSlash(
                path.relative(path.resolve(__dirname, '../template'), filenames)
            ),
            resolvePath: path.resolve(filenames)
        };
        vueComponents = [component];
    }

    let copyResult;
    if (defaultOptions.tailwind) {
        copyResult = await copyFirstComponent(vueComponents);

        vueComponents = copyResult[0];

        // I don't know why, but it runs fine with this line.
        setTimeout(() => {}, 500);

        const replace = require('replace-in-file');
        await replace({
            files: path.resolve(vueComponents[0].resolvePath),
            from: /<style[ A-Za-z|A-Za-z]+>/,
            to: match =>
                match +
                `\n@import url('${convertSlash(
                    path.relative(
                        path.resolve(
                            path.dirname(vueComponents[0].resolvePath)
                        ),
                        path.resolve(
                            '../',
                            __dirname,
                            '../template',
                            'tailwind.css'
                        )
                    )
                )}');\n`
        });
    }

    // Import each components
    vueComponents.forEach(com => {
        imports += `\nimport ${com.name.toLowerCase()} from '${
            com.path
        }';\nexport const ${com.name} = ${com.name.toLowerCase()};\n`;
    });

    const templateDir = (file = '') =>
        path.resolve(__dirname, '../template', file);

    await fs.copy(
        templateDir('template.js'),
        templateDir('__template.js'),
        err => {
            if (err) {
                throw err;
            }
        }
    );

    await fs.appendFile(templateDir('__template.js'), imports, err => {
        if (err) {
            throw err;
        }
    });

    // Rollup `input` options
    const inputOptions = {
        input: templateDir('__template.js'),
        plugins: [
            ...defaultOptions.plugins,
            ...plugins({
                tailwind: defaultOptions.tailwind,
                purge: defaultOptions.purge
            })
        ],
        external: ['vue']
    };
    // Rollup `output` options
    const outputOptions = {
        format: 'iife',
        name: 'Components',
        sourcemap: 'hidden',
        globals: {
            vue: 'Vue'
        }
    };

    const bundle = await rollup(inputOptions);
    const { output } = await bundle.generate(outputOptions);

    await fs.remove(templateDir('__template.js'));
    // Only run when tailwind options is true
    defaultOptions.tailwind && (await fs.remove(copyResult[1]));

    let { code } = output[0];

    code += '\nreturn Components;';

    const result = parseStrToFunc(code)();

    return result;
}
