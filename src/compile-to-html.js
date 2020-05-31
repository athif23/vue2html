const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer();

const compileToComponent = require('./compile-to-component.js');

module.exports = async function(filenames = '', options = {}) {
  if (!filenames) return;

  // Extend default options
  const defaultOptions = {
    props: {},
    context: {}
  };

  Object.assign(defaultOptions, options);

  const components = await compileToComponent(filenames, defaultOptions);

  Object.keys(components).forEach(key => {
    const component = components[key];

    const { props } = defaultOptions;

    const vueInstance = new Vue({
      render: h => h(component, { props })
    });

    renderer.renderToString(
      vueInstance,
      defaultOptions.context,
      (err, html) => {
        if (err) throw err;
        component.html = html;
      }
    );
  });

  return components;
};
