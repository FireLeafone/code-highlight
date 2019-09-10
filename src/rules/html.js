/**
 * 标签<ele/> 规则
 * html rule
 */
export default [{
  name: 'com',
  rule: '(<!--[\\s\\S]*?-->)',
  callback: function(str) {
    return str.replace(/</g, '&lt;');
  }
}, {
  name: 'tag',
  rule: '(<[\\/!]?[\\w-]+|>)',
  callback: function(str) {
    return str.replace('<', '&lt;');
  }
}, {
  name: 'attr',
  rule: '\\b([\\w-:]+[=>])'
}, {
  name: 'str', // attribute value
  rule: '(\\"[\\s\\S]*?\\")'
}];