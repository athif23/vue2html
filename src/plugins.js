const pluginCommonJS = require('@rollup/plugin-commonjs');
const pluginVue = require('rollup-plugin-vue');

export default [pluginVue(), pluginCommonJS()];
