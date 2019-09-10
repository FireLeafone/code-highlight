/**
 * css rule
 */
export default [{
  name: 'tag',
  rule: '(<[\\/!]?[\\w\\d]+|>)',
  callback: function(str) {
    return str.replace('<', '&lt;');
  }
}, {
  name: 'str', // attribute value
  rule: '(\\"[\\s\\S]*?\\")'
}];