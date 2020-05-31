const fs = require('fs');
const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer();

const compileToComponent = require('./compile-to-component.js');
const {isVueFile, getComponentName} = require('./utils');

module.exports = async function (filenames = '', options = {}) {
    if (!filenames) {
        return;
    }

    let componentsData;

    // Extend default options
    const defaultOptions = {
        props: {},
        context: {},
        writeToFile: false
    };
    Object.assign(defaultOptions, options);

    if (Array.isArray(filenames)) {
        componentsData = filenames.map(file => ({
            name: getComponentName(file),
            isVue: isVueFile(file),
            path: file
        }));
    }

    const components = await compileToComponent(filenames, defaultOptions);

    const componentHtmls = {};

    Object.keys(components).forEach((key, idx) => {
        let component = components[key];

        // This is needed because when filenames is Array
        // all the property needed are inside default property.
        if (component.default) {
            component = component.default;
        }

        const props = Array.isArray(filenames) ?
            defaultOptions.props[idx] :
            defaultOptions.props;

        const vueInstance = new Vue({
            render: h => h(component, {props})
        });

        renderer.renderToString(
            vueInstance,
            defaultOptions.context,
            (err, html) => {
                if (err) {
                    throw err;
                }

                componentHtmls[key] = html;

                if (defaultOptions.writeToFile) {
                    const filename = componentsData[idx].name + '.html';
                    fs.writeFileSync(filename, html);
                }
            }
        );
    });

    return componentHtmls;
};
