// require('./lodash/after');
// require('../src/dots/rest');
// require('../src/dots/fp');



// const R = require('ramda');
//
// function add(x, y) {console.log(x + y)}
// const addEd = R.curry(add);
// const f = addEd(1);
// f(2);

let count = 0;
function mutil(x) {
  count++
  return x*x
}

var squareNumber  = memoize(mutil);


// 可以实现，但是不是很健壮.
function memoize(fn) {
  let cache = {};
  return function() {
     var arg_str = JSON.stringify(arguments);
     cache[arg_str] = cache[arg_str] || fn.apply(fn, arguments);
     return cache[arg_str];
    //  return cache[val] ? cache[val] : (cache[val] = fn(val), cache[val])
  }
}

console.log( squareNumber(4) );
console.log( squareNumber(4) );
console.log( squareNumber(5) );
console.log( squareNumber(5) );
console.log(count);
