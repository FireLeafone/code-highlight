# code-prism-beautify

> 基于 prismJS 简易版code美化、高亮展示。

[![AXHR][axhr-img]][axhr-url]
[![AXHR version][npm-img]][npm-url]
[![npm download][download-img]][download-url]

[axhr-url]: https://github.com/FireLeafone/code-highlight
[axhr-img]: https://img.shields.io/badge/code--highlight-coding-brightgreen
[npm-url]: https://www.npmjs.com/package/code-prism-highlight
[npm-img]: https://img.shields.io/npm/v/code-prism-highlight
[download-url]: https://www.npmjs.com/package/code-prism-highlight
[download-img]: https://img.shields.io/npm/dm/code-prism-highlight

## 支持语言

> 请使用下面的语言简写

- markup (例HTML, XML)
- css
- js
- jsx

## 使用

```css
@import "~code-prism-highlight/lib/theme/theme-dark.css"
```

```js
import codeHighlight from "code-prism-highlight";

var highCode = codeHighlight(`code`, "js", {theme: "dark"})
```

## prismJS

> 更多语言支持，可以使用 [prismJS](https://prismjs.com/)

### 按需加载

[babel-plugin-prismjs](https://github.com/mAAdhaTTah/babel-plugin-prismjs)

```json
{
  "plugins": [
    ["prismjs", {
        "languages": ["javascript", "css", "markup"],
        "plugins": ["line-numbers"],
        "theme": "twilight",
        "css": true
    }]
  ]
}
```
