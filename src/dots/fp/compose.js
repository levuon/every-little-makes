
// compose(f, g, z)(args) ==>  f(g(z(args)));
const compose = (...funcs) => {
  if (funcs.length === 0) {
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  const last = funcs[funcs.length - 1]
  const rest = funcs.slice(0, -1)
  return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
}

// composePromise(f, g, z)(args);
// f, g, z is a promise.
// f(args).then(ret => g(ret)).then(ret => z(ret));
const composePromise = (...fns) => params =>
  fns.reduce((promised, fn) => promised.then(fn), Promise.resolve(params));


// pointfree (Pointfree style means never having to say your data )
// 永远不必说出你的数据
// eg.
var composePoint = function(f,g) {
  return function(x) {
    return f(g(x));
  };
};

//
// // 非 pointfree,因为提到了数据:word
// var snakeCase = function (word) {
//   return word.toLowerCase().replace(/\s+/ig, '_');
// };
// // pointfree
// var snakeCase = composePoint(replace(/\s+/ig, '_'), toLowerCase);


//eg.
const pipe = (...funcs) => {
    if (funcs.length === 0) {
      return arg => arg
    }
    if (funcs.length === 1) {
      return funcs[0]
    }
    const last = funcs[funcs.length - 1]
    const rest = funcs.slice(0, -1)
    return arg => rest.reduce((piped, func) => func(piped), last(arg));
}
const add1 = x => x + 1;
const doublex = x => x * x;

const initials = pipe(add1, doublex)
console.log( initials(2) );
// initials("hunter stockton thompson");



module.exports = {
  compose,
  composePromise
};
