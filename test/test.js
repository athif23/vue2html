const test = require('ava');
const fs = require('fs-extra');

const { compileToHTML } = require('../dist');

test.beforeEach(t => {
    Object.assign(t.context, { props: 'Athif Humam' });
});

// Remove html_components folder after each test
test.afterEach(async _ => {
    await fs.rmdir('html_components', async err => {
        if (err) {
            throw err;
        }
    });
});

test('can render html', async t => {
    const { App } = await compileToHTML('./fixtures/App.vue', {
        props: { name: t.context.props }
    });
    const result =
        '<div data-server-rendered="true" data-v-d4599232><header data-v-d4599232>\n' +
        '  This is header, Athif Humam\n';

    t.true(App.includes(result));
});
