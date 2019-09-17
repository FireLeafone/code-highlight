import Token from "./token";

/**
 * 匹配 code 语法
 * @param {*} text
 * @param {*} strarr
 * @param {*} grammar
 * @param {*} index， 匹配索引
 * @param {*} startPos， 开始匹配位置
 * @param {*} oneshot， 是否一次匹配
 * @param {*} target, 是否直接返回
 * @returns
 */

function tokenize(text, grammar) {
  var strarr = [text];
  var rest = grammar.rest;

  if (rest) {
    for (var token in rest) {
      grammar[token] = rest[token];
    }
    delete grammar.rest;
  }
  matchGrammar(text, strarr, grammar, 0, 0, false);
  return strarr;
}

function matchGrammar (text, strarr, grammar, index, startPos, oneshot, target) {
  for (var token in grammar) {
    if (!Object.prototype.hasOwnProperty.call(grammar, token) || !grammar[token]) {
      continue;
    }

    var patterns = grammar[token];
    patterns = Array.isArray(patterns) ? patterns : [patterns];

    for (var j = 0; j < patterns.length; ++j) {
      if (target && target == token + ',' + j) {
        return;
      }

      var pattern = patterns[j],
        inside = pattern.inside,
        lookbehind = !!pattern.lookbehind,
        greedy = !!pattern.greedy,
        lookbehindLength = 0,
        alias = pattern.alias;

      if (greedy && !pattern.pattern.global) {
        // Without the global flag, lastIndex won't work
        var flags = pattern.pattern.toString().match(/[imsuy]*$/)[0];
        pattern.pattern = RegExp(pattern.pattern.source, flags + 'g');
      }

      pattern = pattern.pattern || pattern;

      // Don’t cache length as it changes during the loop
      for (var i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, ++i) {

        var str = strarr[i];

        if (strarr.length > text.length) {
          // Something went terribly wrong, ABORT, ABORT!
          return;
        }

        if (str instanceof Token) {
          continue;
        }

        if (greedy && i != strarr.length - 1) {
          pattern.lastIndex = pos;
          var match = pattern.exec(text);
          if (!match) {
            break;
          }

          var from = match.index + (lookbehind && match[1] ? match[1].length : 0),
              to = match.index + match[0].length,
              k = i,
              p = pos;

          for (var len = strarr.length; k < len && (p < to || (!strarr[k].type && !strarr[k - 1].greedy)); ++k) {
            p += strarr[k].length;
            // Move the index i to the element in strarr that is closest to from
            if (from >= p) {
              ++i;
              pos = p;
            }
          }

          // If strarr[i] is a Token, then the match starts inside another Token, which is invalid
          if (strarr[i] instanceof Token) {
            continue;
          }

          // Number of tokens to delete and replace with the new match
          delNum = k - i;
          str = text.slice(pos, p);
          match.index -= pos;
        } else {
          pattern.lastIndex = 0;
          match = pattern.exec(str);
          var delNum = 1;
        }

        if (!match) {
          if (oneshot) {
            break;
          }

          continue;
        }

        if(lookbehind) {
          lookbehindLength = match[1] ? match[1].length : 0;
        }

        from = match.index + lookbehindLength;
            match = match[0].slice(lookbehindLength);
            to = from + match.length;

        var before = str.slice(0, from),
            after = str.slice(to);

        var args = [i, delNum];

        if (before) {
          ++i;
          pos += before.length;
          args.push(before);
        }

        var wrapped = new Token(token, inside? tokenize(match, inside) : match, alias, match, greedy);

        args.push(wrapped);

        if (after) {
          args.push(after);
        }
        Array.prototype.splice.apply(strarr, args);

        if (delNum != 1)
          matchGrammar(text, strarr, grammar, i, pos, true, token + ',' + j);

        if (oneshot)
          break;
      }
    }
  }
}

export {
  tokenize,
  matchGrammar
};
