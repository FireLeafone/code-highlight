/**
 * code demo data
 */

const HTML_CODE = `
  <h3>hello, world</h3>
  <p style="color: red;">code highlight demo。 目前支持以下几种语言高亮：</p>
  <ul class="code-type">
    <li>html</li>
    <li>css</li>
    <li>js</li>
  </ul>
`;

const CSS_CODE = `
  @font-face {
    font-family: Chunkfive; src: url('Chunkfive.otf');
  }

  body, .usertext {
    color: #F0F0F0; background: #600;
    font-family: Chunkfive, sans;
    --heading-1: 30px/32px Helvetica, sans-serif;
  }

  @import url(print.css);
  @media print {
    a[href^=http]::after {
      content: attr(href)
    }
  }
  .code-demo {
    position: relative;
  }
  .code-demo > pre {
    padding: 8px;
  }
  .code-demo::after {
    content: " ";
    position: absolute;
    left: 0;
    top: -10px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: red;
  }
  pre:hover {
    background: #e3e3e3;
    border: 1px solid #333;
  }
`;

const JS_CODE = `
  function $initHighlight(block, cls) {
    try {
      if (cls.search(/\bno\-highlight\b/) != -1)
        return process(block, true, 0x0F) +
              "class=" + cls;
    } catch (e) {
      /* handle exception */
    }
    for (var i = 0 / 2; i < classes.length; i++) {
      if (checkCondition(classes[i]) === undefined)
        console.log('undefined');
    }

    return (
      <div>
        <web-component>{block}</web-component>
      </div>
    )
  }

  export  $initHighlight;
`;

const codesList = {
  "markup": HTML_CODE,
  "css": CSS_CODE,
  "js": JS_CODE,
  "jsx": JS_CODE
};