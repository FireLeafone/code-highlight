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
* @link 参考 https://github.com/jianghai/code-beautify
*/

import ruleMap from './rules';

function parse(source, lang) {
  // Remove \n in the start
  source = source.replace(/^\n/g, '');

  // Replace whitespace with entity
  // '\s' contains '\n', so just use ' '
  // source = source.replace(/ /g, '\u00a0');

  var reg = getReg(lang);
  if (reg) {
    var rules = ruleMap[lang];
    var reg = new RegExp(getReg(lang), 'g');
    source = source.replace(reg, function() {
      var args = arguments;
      var len = args.length - 1;
      var i = 1;
      for (; i < len; i++) {
        if (args[i] && rules[i - 1]) {
          if (rules[i - 1].callback) {
            args[i] = rules[i - 1].callback.call(null, args[i]);
          }
          return '<span class="' + rules[i - 1].name + '">' + args[i] + '</span>';
        }
      }
    });
  }

  return source.replace(/\n/g, '<br>');
}


/**
 * Get all regexp rules of this lang.
 */
function getReg(lang) {
  if (getReg[lang]) return getReg[lang];
  var reg = [];
  var rules = ruleMap[lang];
  if (rules) {
    for (var i = 0; i < rules.length; i++) {
      reg.push(rules[i].rule);
    }
  }
  reg = reg.join('|');

  getReg[lang] = reg;

  return reg;
}


/**
 * Outer interface
 */
module.exports = function(source, lang) {
  return parse(source, lang);
};
