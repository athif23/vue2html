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


## Why I Made This

Some of the project I made require me to convert vue components to HTML to made my life easier. After searching for a while, surprisingly I can't find any, so instead of give up about it, why not create it myself?


## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [TODO](#todo)
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

> This is not working, yet.
>
> ```sh
> vue2html ./Component.vue, ./App.vue, ./Header.vue 
> ```

Or you can use the APIs provided, like `compileToHTML` or `compileToComponent`.

```js
const { compileToHTML } = require('vue2html');
const path = require('path');

// Single path
compileToHTML('./Component.vue', {
  // You can pass props here to pass to your component
  // Do note that this is only for single path only!
  props: {},
  // You can pass vue-server-renderer's `context`
  context: { 
    title: 'vue ssr',
    metas: `
        <meta name="keyword" content="vue,ssr">
        <meta name="description" content="vue srr demo">
    `,
  },
  // Automatically write to a file with the name of the component
  writeToFile: true
}).then(({ Component }) => console.log(Component.html));

// Multiple path
compileToHTML(['./Component.vue', './Header.vue'], {
  // Note: the order of the props need to be the same 
  // with the order of the paths
  props: [
    { name: "Athif Humam", count: 12 },
    { color: 'black' }
  ]
})
```


## TODO

* [ ] Add css plugins
* [ ] Can pass folder path as an argument, like `./components`
* [ ] Add more test

> I'm honestly quite a newbie in this one, so if you can help, please do :)

* [ ] Convert raw string instead of file

> I haven't found a way to do this yet, and as far as I know, rollup only allowed file path to be passed to their input options. If someone know about this, please do tell me or you can just open up a PR. I would really appreciate it :)


## Contributors

| Name                     | Website                      |
| ------------------------ | ---------------------------- |
| **Muhammad Athif Humam** | <https://athif23.github.io/> |


## License

[MIT](LICENSE) © [Muhammad Athif Humam](https://athif23.github.io/)


## 

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/
