const compileToHTML = require('./compile-to-html.js');
const compileToComponent = require('./compile-to-component.js');

// CompileToHTML('./test/fixtures/App.vue', {props: {name: 'Athif Humam'}}).then(console.log);

module.exports = {
    compileToHTML,
    compileToComponent
};
