/**
 * code utils
 */

import utils from "./utils";

export function extend (code, redef) {
  var lang = utils.clone(code);

  for (var key in redef) {
    lang[key] = redef[key];
  }

  return lang;
}

/**
* Insert a token before another token in a language literal
* As this needs to recreate the object (we cannot actually insert before keys in object literals),
* we cannot just provide an object, we need an object and a key.
* @param inside The key (or language id) of the parent
* @param before The key to insert before.
* @param insert Object with the key/value pairs to insert
* @param root The object that contains `inside`. If equal to languages, it can be omitted.
*/
export function insertBefore (inside, before, insert, languages) {
  var grammar = languages[inside];
  var ret = {};

  for (var token in grammar) {
    if (Object.prototype.hasOwnProperty.call(grammar, token)) {

      if (token == before) {
        for (var newToken in insert) {
          if (Object.prototype.hasOwnProperty.call(insert, newToken)) {
            ret[newToken] = insert[newToken];
          }
        }
      }

      // Do not insert token which also occur in insert. See #1525
      if (!Object.prototype.hasOwnProperty.call(insert, token)) {
        ret[token] = grammar[token];
      }
    }
  }

  var old = languages[inside];
  languages[inside] = ret;

  // Update references in other language definitions
  DFS(languages, function(key, value) {
    if (value === old && key != inside) {
      this[key] = ret;
    }
  });

  return ret;
}

// Traverse a language definition with Depth First Search
export function DFS (o, callback, type, visited) {
  var objId = utils.objId;
  visited = visited || {};

  for (var i in o) {
    if (Object.prototype.hasOwnProperty.call(o, i)) {
      callback.call(o, i, o[i], type || i);

      var property = o[i],
          propertyType = utils.type(property);

      if (propertyType === 'Object' && !visited[objId(property)]) {
        visited[objId(property)] = true;
        DFS(property, callback, null, visited);
      }
      else if (propertyType === 'Array' && !visited[objId(property)]) {
        visited[objId(property)] = true;
        DFS(property, callback, i, visited);
      }
    }
  }
}
