const pluginCommonJS = require('@rollup/plugin-commonjs');
const pluginVue = require('rollup-plugin-vue');
const path = require('path');

const purgeCSSOption = {
    content: ['./**/**/*.vue'],

    // This is the function used to extract class names from your templates
    defaultExtractor: content => {
        // Capture as liberally as possible, including things like `h-(screen-1.5)`
        const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];

        // Capture classes within other delimiters like .block(class="w-1/2") in Pug
        const innerMatches =
            content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];

        return broadMatches.concat(innerMatches);
    }
};

function plugins({ tailwind, purge } = { tailwind: false, purge: false }) {
    const postcssPlugins = _ => {
        return [
            require('postcss-import')(),
            require('postcss-url')(),
            tailwind && require('tailwindcss')(
                path.join(__dirname, '../tailwind.config.js')
            ),
            require('autoprefixer')(),
            purge && require('@fullhuman/postcss-purgecss')(purgeCSSOption),
            require('cssnano')({
                preset: 'default'
            })
        ].filter(Boolean);
    };

    const options = {
        defaultLang: { markdown: 'pluginMarkdown' },
        css: true,
        style: {
            postcssPlugins: postcssPlugins()
        }
    };
    return [pluginCommonJS(), pluginVue(options)];
}

export default plugins;
