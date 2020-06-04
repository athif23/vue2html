import Vue from 'vue';
import compileToComponent from './compile-to-component';
import { isStringAndEmpty } from './utils';

const fs = require('fs-extra');
const path = require('path');

export default async function(filenames = '', options = {}) {
    if (!filenames) {
        return;
    }

    const componentHtmls = {};
    let renderer;
    let childSpinner = { stop: () => {}, start: () => {}, succeed: () => {} };

    // Extend default options
    const defaultOptions = {
        props: {},
        context: {},
        template: '',
        tailwind: false,
        purge: false,
        writeToFile: false,
        outDir: 'html_components',
        silent: true
    };
    Object.assign(defaultOptions, options);

    if (
        typeof defaultOptions.template !== 'boolean' ||
        defaultOptions.template
    ) {
        const templatePath =
            isStringAndEmpty(defaultOptions.template) ||
            defaultOptions.template === true
                ? path.resolve(__dirname, '../template', 'index.template.html')
                : defaultOptions.template;
        const template = await fs.readFile(templatePath, 'utf-8');

        renderer = require('vue-server-renderer').createRenderer({
            template,
            runInNewContext: true
        });
    } else {
        renderer = require('vue-server-renderer').createRenderer();
    }

    childSpinner = require('ora')('Compile to normalized component');

    childSpinner.start();
    const components = await compileToComponent(filenames, defaultOptions);
    childSpinner.stop();

    // Make sure output directory exists
    const outDirname = defaultOptions.outDir || 'html_components';
    await fs.ensureDir(outDirname);
    // Loop trough components and render them to html
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
                    const filename = key + '.html';
                    await fs.writeFile(path.join(outDirname, filename), html);
                }
            }
        );
        childSpinner.succeed(`Success compiling ${key} component`);
    });

    return componentHtmls;
}
