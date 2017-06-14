require('../../utils/support');
const R = require('ramda');
const Task = require('data.task');

// Applicative Functor
// Applicative Functor 那就是让不同 functor 可以相互应用(apply)的能 力。
Container = function(x) {
    this.__val = x;
}
Container.of = function(x) {
    return new Container(x);
}

Container.prototype.map = function(f) {
    return Container.of(f(this.__val))
}
Container.prototype.isNothing = function() {
    return (this.__val === null || this.__val === undefined)
}
Container.prototype.chain = function(f) {
    return f(this.__val)
}

// [Object, Object][Object, Object]
console.log(add(Container.of(2), Container.of(3)));

//
var ret = Container.of(2).chain(function(two) {
    return Container.of(3).map(add(two))
});
// Container { __val: 5 }
console.log(ret);

// 上述有个问题 那就是 monad 的顺序执行问题:所有的代码都只 会在前一个 monad 执行完毕之后才执行

// ###############################################
// ap 就是这样一种函数,能够把一个 functor 的函数值应用到另一个 functor 的值 上

Container.prototype.ap = function(otherContainer) {
    // ATTENTION:  this.__val 是一个函数,将会接收另一个 functor 作为参数
    return otherContainer.map(this.__val)
}

// this.__val 为 add(2)
console.log(Container.of(add(2)).ap(Container.of(3)));

Container.of(2).map(add).ap(Container.of(3));

// F.of(x).map(f) == F.of(f).ap(F.of(x))

Maybe = function(x) {
    this.__val = x;
}
Maybe.of = function(x) {
    return new Maybe(x);
}

Maybe.prototype.isNothing = function() {
    return (this.__val === null || this.__val === undefined);
}

Maybe.prototype.map = function(f) {
    // return this.isNothing()
    //     ? Maybe.of(null)
    //     : Maybe.of(f(this.__val))
  var m = this;
  return m.chain(function(a) {
    return m.constructor.of(f(a));
  });
}
Maybe.prototype.chain = function(f) {
    return f(this.__val)
}
Maybe.prototype.join = function(f) {
    return this.isNothing()
        ? Maybe.of(null)
        : this.__val;
}
Maybe.prototype.ap = function(otherFunctor){
  // return otherFunctor.map(this.__val)
  return this.chain(function(f) {
    return otherFunctor.map(f);
  });
}

IO = function (arg) {
  this.unsafePerformIO = arg;
}
IO.of = function (arg) {
  // 仅仅是为了延迟执行
  return new IO(function(){
    return arg;
  })
}

IO.prototype.map = function (f) {
  return new IO(R.compose(f, this.unsafePerformIO));
}

IO.prototype.join = function(x){
  return this.unsafePerformIO();
}
IO.prototype.ap = function (functor) {
  return functor.map(this.unsafePerformIO())
}


// 第一个ap map的__val 是add ，第二ap map的__val 是 add(2)
// Maybe { __val: 5 }
console.log( Maybe.of(add).ap(Maybe.of(2)).ap(Maybe.of(3)));

// 5
Task.of(add).ap(Task.of(2)).ap(Task.of(3)).fork(
  err => console.log(err.message),
  data => console.log(data)
)

// ==============
var keyVal = {
  email: {
    value: 'levuonliu@gmail.com',
  },
  password: {
    value: 'asdfghjkl'
  }
}


// $::String->IO DOM
var $ = function(selector){
  return new IO(function(){
    return keyVal[selector]
  })
}

// getVal :: String -> IO String
var getVal = R.compose(map(R.prop('value')), $);

//  signIn :: String -> String -> Bool -> User
var signIn = R.curry(function(username, password, remember_me){
  console.log(username, password, remember_me);
})
// IO { unsafePerformIO: [Function] }
//
console.log(IO.of(signIn).ap(getVal('email')).ap(getVal('password')).ap(IO.of(false)).unsafePerformIO());



//

var liftA2 = R.curry(function(f, functor1, functor2){
  return functor1.map(f).ap(functor2)
});
var liftA3 = R.curry(function(f, functor1, functor2, functor3) {
  return functor1.map(f).ap(functor2).ap(functor3);
});

// Maybe { __val: 5 }
console.log(liftA2(add, Maybe.of(2), Maybe.of(3)));


var tOfM = R.compose(Task.of, Maybe.of);

// Task { fork: [Function], cleanup: [Function: cleanupBoth] }
console.log( liftA2(concat, tOfM('Rainy Days and Mondays'), tOfM(' alwaysget me down')));
liftA2(R.concat, tOfM('Rainy Days and Mondays'), tOfM(' alwaysget me down'))
  
