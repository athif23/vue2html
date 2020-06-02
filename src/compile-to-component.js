import plugins from './plugins';
import { isVueFile, getComponentName, parseStrToFunc } from './utils';

const { rollup } = require('rollup');
const path = require('path');
const fs = require('fs');

function componentsToObject(components) {
    const result = `{
  ${components.map(c => c.name)}
}`;
    return result;
}

export default async function(filenames, options = {}) {
    if (!filenames) {
        return;
    }

    let input;
    let vueComponents;

    // This is default options
    const defaultOptions = {
        props: {},
        plugins: []
    };

    // Extend default options
    Object.assign(defaultOptions, options);

    if (Array.isArray(filenames)) {
        vueComponents = filenames.map(file => {
            return {
                name: getComponentName(file),
                isVue: isVueFile(file),
                path: file
            };
        });

        let imports = '';
        vueComponents.forEach(com => {
            imports += `const ${com.name} = require('./${com.path}');\n`;
        });

        await fs.writeFile('__temp.js', imports, err => {
            if (err) {
                throw err;
            }
        });

        input = path.resolve('__temp.js');
    } else {
        input = path.resolve(filenames);
        const component = {
            name: getComponentName(filenames),
            isVue: isVueFile(filenames),
            path: filenames
        };
        vueComponents = [component];
    }

    // Rollup `input` options
    const inputOptions = {
        input,
        plugins: [...defaultOptions.plugins, ...plugins],
        external: ['vue']
    };
    // Rollup `output` options
    const outputOptions = {
        format: 'iife',
        name: 'App',
        sourcemap: false,
        globals: {
            vue: 'Vue'
        }
    };

    const bundle = await rollup(inputOptions);
    const { output } = await bundle.generate(outputOptions);

    // We need to remove __temp file!
    fs.access('__temp.js', fs.constants.F_OK, async err => {
        if (err) {
            return;
        }

        await fs.unlink('__temp.js', err => {
            if (err) {
                throw err;
            }
        });
    });

    let { code } = output[0];
    // Remove iife wrapper if filenames is an Array
    if (Array.isArray(filenames)) {
        code = code.slice(14, -6);
    }

    code += `return ${componentsToObject(vueComponents)};`;

    const realComponents = parseStrToFunc(code)();

    return realComponents;
}
