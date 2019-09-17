import Token from "./token";

var uniqueId = 0;

const utils = {
  encode: function (t) {
    if (t instanceof Token) {
      return new Token(t.type, utils.encode(t.content), t.alias);
    } else if (Array.isArray(t)) {
      return t.map(utils.encode);
    } else {
      return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
    }
  },

  type: function (o) {
    return Object.prototype.toString.call(o).slice(8, -1);
  },

  objId: function (obj) {
    if (!obj['__id']) {
      Object.defineProperty(obj, '__id', { value: ++uniqueId });
    }
    return obj['__id'];
  },

  // Deep clone a language definition (e.g. to extend it)
  clone: function (o, visited) {
    var clone, id, type = utils.type(o);
    visited = visited || {};

    switch (type) {
      case 'Object':
        id = utils.objId(o);
        if (visited[id]) {
          return visited[id];
        }
        clone = {};
        visited[id] = clone;

        for (var key in o) {
          if (Object.prototype.hasOwnProperty.call(o, key)) {
            clone[key] = utils.clone(o[key], visited);
          }
        }

        return clone;

      case 'Array':
        id = utils.objId(o);
        if (visited[id]) {
          return visited[id];
        }
        clone = [];
        visited[id] = clone;

        o.forEach(function (v, i) {
          clone[i] = utils.clone(v, visited);
        });

        return clone;

      default:
        return o;
    }
  }
};

export default utils;
