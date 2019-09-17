/**
 * @link https://github.com/PrismJS/prism/blob/master/components/prism-markup.js
 */
import hooks from "../utils/hooks";

const markupRule = {
	'comment': /<!--[\s\S]*?-->/,
	'prolog': /<\?[\s\S]+?\?>/,
	'doctype': /<!DOCTYPE[\s\S]+?>/i,
	'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
	'tag': {
		pattern: /<\/?(?!\d)[^\s>/=$<%]+(?:\s(?:\s*[^\s>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
		greedy: true,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>/]+/i,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>/:]+:/
				}
			},
			'attr-value': {
				pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
				inside: {
					'punctuation': [
						/^=/,
						{
							pattern: /^(\s*)["']|["']$/,
							lookbehind: true
						}
					]
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>/]+/,
				inside: {
					'namespace': /^[^\s>/:]+:/
				}
			}

		}
	},
	'entity': /&#?[\da-z]{1,8};/i
};

markupRule['tag'].inside['attr-value'].inside['entity'] = markupRule['entity'];

// Plugin to make entity title show the real entity, idea by Roman Komarov
hooks.add('wrap', function(env) {
	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});


export default markupRule;
