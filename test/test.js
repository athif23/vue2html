const test = require('ava');

const {compileToHTML} = require('../src');

test.beforeEach(t => {
    Object.assign(t.context, {props: 'Athif Humam'});
});

test('can render html', async t => {
    const {App} = await compileToHTML('./test/fixtures/App.vue', {
        props: {name: t.context.props}
    });
    const result =
        '<div data-server-rendered="true" data-v-d4599232><header data-v-d4599232>\n' +
        '  This is header, Athif Humam\n';

    t.true(App.includes(result));
});

test('can render mutiple files', async t => {
    const {App, Header} = await compileToHTML(
        ['./test/fixtures/App.vue', './test/fixtures/Header.vue'],
        {
            props: [{name: t.context.props}, {name: 'Header Props'}]
        }
    );
    const appResult =
        '<div data-server-rendered="true" data-v-d4599232><header data-v-d4599232>\n' +
        '  This is header, Athif Humam\n';

    const headerResult =
        '<header data-server-rendered="true">\n' +
        '  This is header, Header Props\n';

    t.true(App.includes(appResult));
    t.true(Header.includes(headerResult));
});
