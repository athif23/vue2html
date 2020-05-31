const pluginCommonJS = require('@rollup/plugin-commonjs');
const pluginVue = require('rollup-plugin-vue');

module.exports = [pluginVue(), pluginCommonJS()];
