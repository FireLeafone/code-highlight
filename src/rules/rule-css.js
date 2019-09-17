/**
 * @link https://github.com/PrismJS/prism/blob/master/components/prism-css.js
 */

const string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
const cssRule = {
	'comment': /\/\*[\s\S]*?\*\//,
	'atrule': {
		pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
		inside: {
			'rule': /@[\w-]+/
			// See rest below
		}
	},
	'url': {
		pattern: RegExp('url\\((?:' + string.source + '|[^\n\r()]*)\\)', 'i'),
		inside: {
			'function': /^url/i,
			'punctuation': /^\(|\)$/
		}
	},
	'selector': RegExp('[^{}\\s](?:[^{};"\']|' + string.source + ')*?(?=\\s*\\{)'),
	'string': {
		pattern: string,
		greedy: true
	},
	'property': /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
	'important': /!important\b/i,
	'function': /[-a-z0-9]+(?=\()/i,
	'punctuation': /[(){};:,]/
};

cssRule['atrule'].inside.rest = cssRule;

export default cssRule;
