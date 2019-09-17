/*
 * @File: index.js
 * @Project: code-highlight
 * @File Created: Tuesday, 10th September 2019 3:22:35 pm
 * @Author: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com)
 * -----
 * @Last Modified: Tuesday, 10th September 2019 3:22:41 pm
 * @Modified By: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com>)
 * -----
 * @Copyright <<projectCreationYear>> - 2019 ***, ***
 * @fighting: code is far away from bug with the animal protecting
 *  ┏┓      ┏┓
 *  ┏┛┻━━━┛┻┓
 *  |           |
 *  |     ━    |
 *  |  ┳┛ ┗┳ |
 *  |          |
 *  |     ┻   |
 *  |           |
 *  ┗━┓     ┏━┛
 *     |      | 神兽保佑 🚀🚀🚀
 *     |      | 代码无BUG！！！
 *     |      ┗━━━┓
 *     |            ┣┓
 *     |            ┏┛
 *     ┗┓┓ ┏━┳┓┏┛
 *      |┫┫   |┫┫
 *      ┗┻┛   ┗┻┛
 */

/**
* @link 参考 https://github.com/PrismJS/prism/blob/master/prism.js#L282
*/

import hooks from './utils/hooks';
import Token from './utils/token';
import utils from './utils/utils';
import {tokenize} from "./utils/matchGrammar";
import languages from "./rules";

function highlight (text, grammar, language) {
  if (!grammar) return text;
  
  var env = {
    code: text,
    grammar: grammar,
    language: language
  };
  hooks.run('before-tokenize', env);
  env.tokens = tokenize(env.code, env.grammar);
  hooks.run('after-tokenize', env);
  return Token.stringify(utils.encode(env.tokens), env.language);
}

function parse(source, lang, config) {
  const props = Object.assign({}, {
    theme: "light",
    transparent: false
  }, config);

  const codeHtml = highlight(source, languages[lang], lang);
  const className = `code-highlight pre-${props.theme || "light"}` + (props.transparent ? "pre-transparent" : "");
  return `<pre class="${className}">${codeHtml}</pre>`;
}

/**
 * Outer interface
 */
export default function (source, lang, config) {
  return parse(source, lang, config);
}
