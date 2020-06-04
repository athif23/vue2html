# vue2html

[![build status](https://img.shields.io/travis/com/athif23/vue2html.svg)](https://travis-ci.com/athif23/vue2html)
[![code coverage](https://img.shields.io/codecov/c/github/athif23/vue2html.svg)](https://codecov.io/gh/athif23/vue2html)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/athif23/vue2html.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/vue2html.svg)](https://npm.im/vue2html)

> A simple tool to convert vue component to html 

> DISCLAIMER: This library are still in development, so there's many missing features.


## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [Options](#options)
* [Contributors](#contributors)
* [Known Issues](#known-issues)
* [License](#license)


## Install

Install `vue2html` globally,

```sh
npm install -g vue2html
```

## Usage

Now, you just need to pass your `.vue` file as the argument. You can pass as much as you want. Directory or Components paths.

```sh
vue2html Component.vue App.vue ./components 
```

Use `--help` or `-h` to see all the available options.
```sh
vue2html --help
```

Or you can also call it programmatically.

```sh
npm install vue2html
```

```js
const { compileToHTML } = require('vue2html');
const path = require('path');

// Single path
compileToHTML('./Component.vue', {
  props: {},
  // Pass vue-server-renderer's `context`
  context: { 
    title: 'vue ssr',
    metas: `
        <meta name="keyword" content="vue,ssr">
        <meta name="description" content="vue srr demo">
    `,
  },
  writeToFile: true
});

// Multiple paths
compileToHTML(['./Component.vue', './Header.vue'], {
  // Note: the order of the props need to be the same with the order of the paths
  props: [
    { name: "Athif Humam", count: 12 },
    { color: 'black' }
  ],
  writeToFile: true
});
```

### Known Issues
* If you use tailwind please remember that it would take more time to generate than without it, especially if you also use purge option. I mean that's just how it should be. I can't change it even if I want to.

* Component's style included in other components. I don't know why this happens, and I honestly doesn't really want to care much about this right now. But don't worry if you use scoped style, it would be safe even if it included in other components... I think.

##### TODO

* [x] Add css
* [x] Add postcss plugins
* [x] Add Tailwindcss
* [x] Can pass folder path as an argument, like `./components`
* [ ] Add more test
* [ ] Convert raw string instead of file

> I haven't found a way to do this yet, and as far as I know, rollup only allowed file path to be passed to their input options. If someone know about this, please do tell me or you can just open up a PR. I would really appreciate it :)


## Contributors

| Name                     | Website                      |
| ------------------------ | ---------------------------- |
| **Muhammad Athif Humam** | <https://athif23.github.io/> |


## License

[MIT](LICENSE) © [Muhammad Athif Humam](https://athif23.github.io/)
