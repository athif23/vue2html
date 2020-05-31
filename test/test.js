const test = require('ava');

const { compileToHTML } = require('../src');

test.beforeEach(t => {
  Object.assign(t.context, { props: 'Athif Humam' });
});

test('can render html', async t => {
  const { App } = await compileToHTML('./test/fixtures/App.vue', {
    props: { name: t.context.props }
  });
  const result = `<div data-server-rendered="true" data-v-d4599232><header data-v-d4599232>
  This is header, Athif Humam
</header>
  Hello Athif Humam
</div>`;
  t.true(App.html.includes(result));
});

// test('sets a config object', t => {
//   const script = new Script(false);
//   t.true(script instanceof Script);
// });

// test('renders name', t => {
//   const { script } = t.context;
//   t.is(script.renderName(), 'script');
// });

// test('sets a default name', t => {
//   const { script } = t.context;
//   t.is(script._name, 'script');
// });
