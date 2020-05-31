# vue2html

[![build status](https://img.shields.io/travis/com/athif23/vue2html.svg)](https://travis-ci.com/athif23/vue2html)
[![code coverage](https://img.shields.io/codecov/c/github/athif23/vue2html.svg)](https://codecov.io/gh/athif23/vue2html)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/athif23/vue2html.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/vue2html.svg)](https://npm.im/vue2html)

> A simple tool to convert vue component to html 


## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [TODO](#todo)
  * [Convert string instead of file](#convert-string-instead-of-file)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm install vue2html
```

[yarn][]:

```sh
yarn add vue2html
```


## Usage

The usage should be pretty simple, you just need to pass your .vue file as the argument. You can pass one or more to it.

```sh
vue2html ./Component.vue, ./App.vue, ./Header.vue 
```

Or you can use the APIs provided, like `compileToHTML` or `compileToComponent`.

```js
const { compileToHTML } = require('vue2html');
const path = require('path');

const html = compileToHTML('./Component.vue', {
  // You can pass vue-server-renderer's `context`
  context: {
    title: 'vue ssr',
    metas: `
        <meta name="keyword" content="vue,ssr">
        <meta name="description" content="vue srr demo">
    `,
  }
});

console.log(html);
// script
```


## TODO

### Convert string instead of file

I have not found a way to do this, and as far as I know rollup only allowed file path to be passed to their input options. So if someone know how to overcome this, please do tell me or you can just open up a PR. I would really appreaciate them :)


## Contributors

| Name                     | Website                      |
| ------------------------ | ---------------------------- |
| **Muhammad Athif Humam** | <https://athif23.github.io/> |


## License

[MIT](LICENSE) © [Muhammad Athif Humam](https://athif23.github.io/)


## 

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/
