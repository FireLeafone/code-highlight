# code-prism-beautify

> 基于 prismJS 简易版code美化、高亮展示。

## 支持语言

- markup (例HTML, XML)
- css
- js
- jsx

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
