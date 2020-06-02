const fs = require('fs-extra');
const path = require('path');
const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer();

const compileToComponent = require('./compile-to-component.js');
const { isVueFile, getComponentName } = require('./utils');

module.exports = async function(filenames = '', options = {}) {
    if (!filenames) {
        return;
    }

    let componentsData;
    let childSpinner = { stop: () => {}, start: () => {}, succeed: () => {} };

    // Extend default options
    const defaultOptions = {
        props: {},
        context: {},
        writeToFile: false,
        outDir: 'html_components',
        silent: true
    };
    Object.assign(defaultOptions, options);

    if (Array.isArray(filenames)) {
        componentsData = filenames.map(file => ({
            name: getComponentName(file),
            isVue: isVueFile(file),
            path: file
        }));
    } else {
        componentsData = [
            {
                name: getComponentName(filenames),
                isVue: isVueFile(filenames),
                path: filenames
            }
        ];
    }

    if (!defaultOptions.silent) {
        childSpinner = require('ora')('Compile to normalized component');
    }

    const components = await compileToComponent(filenames, defaultOptions);
    childSpinner.stop();

    const componentHtmls = {};

    const outDirname = defaultOptions.outDir || 'html_components';

    // Make sure output directory exists
    await fs.ensureDir(outDirname);

    Object.keys(components).forEach((key, idx) => {
        childSpinner.start(`Compiling ${key} component to HTML...`);
        let component = components[key];

        // This is needed because when filenames is Array
        // all the property needed are inside default property.
        if (component.default) {
            component = component.default;
        }

        const props = Array.isArray(filenames)
            ? defaultOptions.props[idx]
            : defaultOptions.props;

        const vueInstance = new Vue({
            render: h => h(component, { props })
        });

        renderer.renderToString(
            vueInstance,
            defaultOptions.context,
            async (err, html) => {
                if (err) {
                    throw err;
                }

                componentHtmls[key] = html;

                if (defaultOptions.writeToFile) {
                    const filename = componentsData[idx].name + '.html';
                    await fs.writeFile(path.join(outDirname, filename), html);
                }
            }
        );
        childSpinner.succeed(`Success compiling ${key} component`);
    });

    return componentHtmls;
};
