// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function (obj) {
  // your code goes here
  if (typeof obj === 'function' || obj === undefined) {
    return undefined;
  }

  // var result = '';
  return recursiveString(obj);
  // result +=
};

var identifyEachCase = function (obj) {
  if (typeof obj === 'number' || typeof obj === 'boolean') {
    return obj.toString();
  }
  // if (obj === null) {
  //   return 'null';
  // }
  if (typeof obj === 'string') {
    return '"' + obj + '"';
  }

  return null;
};


var recursiveString = function (obj) {
  var result = '';
  if (obj === null) {
    return 'null';
  } else if (typeof obj === 'object' && Array.isArray(obj)) {
    if (obj.length === 0) {
      return '[]';
    } else {
      result += '[';
      _.forEach(obj, function (item) {
        if (typeof item === 'object') {
          result += recursiveString(item) + ',';
        } else {
          result += identifyEachCase(item) + ',';
        }
      });
      // Remove ',' and add ']'
      result = result.slice(0, -1) + ']';
    }
  } else if (typeof obj === 'object' && !Array.isArray(obj)) {
    if (Object.keys(obj).length === 0) {
      return '{}';
    } else {
      result = '{';
      Object.keys(obj).forEach(function (key) {
        if (typeof obj[key] === 'function' || obj[key] === undefined) {
          return;
        }
        if (typeof obj[key] === 'object') {
          result += identifyEachCase(key) + ':' + recursiveString(obj[key]) + ',';
        } else {
          result += identifyEachCase(key) + ':' + identifyEachCase(obj[key]) + ',';
        }
      });
      if (result.length > 1) {
        result = result.slice(0, -1) + '}';
      } else {
        result += '}';
      }
    }
  } else {
    result += identifyEachCase(obj);
  }

  return result;
};
