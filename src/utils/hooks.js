/**
 *  函数hooks存储，执行
 */
const hooks = {
  all: {},
  add: function (name, callback) {
    var hooksAll = hooks.all;
    hooksAll[name] = hooksAll[name] || [];
    hooksAll[name].push(callback);
  },

  run: function (name, env) {
    var callbacks = hooks.all[name];
    var callback = null;

    if (!callbacks || !callbacks.length) {
      return;
    }

    var len = callbacks.length;

    for ( var i=0; i < len; i++) {
      callback = callbacks[i];
      callback(env);
    }
  }
};

export default hooks;
