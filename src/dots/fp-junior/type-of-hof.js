const _ = require('lodash');

// ******************************************************************
// **************  types of high order functions; *******************


// 1: combinators
/* A combinators is a higher-order function that uses only
 * function application and earlier defined combinators to defined
 * a result from its arguments
 */
module.exports = {
  compose
};

function compose (a, b) {
  return function(c){
    return a(b(c));
  }
}

const not = ( fn ) => {
  return (arg) => {
    return !fn(arg);
  }
}

function mapWith(fn){
  return function(array){
    return _.map(array, fn);
  }
}

function maybe (fn) {
  return function (argument) {
    if (argument != null) {
      return fn(argument)
    }
  }
}
var safeSquareAll = mapWith(maybe(function (n) { return n * n }));

console.log(safeSquareAll([1,null,2,3]));

const something = (x) => {
  return x != null
}

var nothing = not(something);

console.log(nothing(111));


//
function addOne( number ){
  return number + 1;
}

function double( number ) {
  return number * 2;
}

const doubleAddOne = compose(double, addOne);
console.log(doubleAddOne(2));

//cook and eat
// var cookAndEat = compose(eat, cook);
