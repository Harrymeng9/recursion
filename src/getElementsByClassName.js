// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

/**
 *
 * @param {*} className target class name
 * @param {*} currNode the current node that the recursion is checking
 * @returns return an array of nodes that match the condition
 */
var helper = function (className, currNode) {
  var result = [];

  // Step 1: Check when to stop the recursion
  if (currNode.classList === undefined) {
    return result;
  }

  // Step 2: Check whether the current node matches the condition
  if (currNode.classList.contains(className)) {
    result.push(currNode);
  }

  // Step 3: Recursively call this function for all the child nodes
  if (currNode.childNodes.length > 0) {
    _.forEach(currNode.childNodes, function(currChildNode) {
      var currChildResult = helper(className, currChildNode);
      result = result.concat(currChildResult);
    });
  }

  return result;
};

var getElementsByClassName = function(className) {
  // your code here
  var documentBody = document.body;
  var finalResult = helper(className, documentBody);
  return finalResult;
};

