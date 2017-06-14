require('../../utils/support');
const R = require('ramda');
const Task = require('data.task');
const Either = require('ramda-fantasy').Either



// 在函数式编程中，通常不会用普通的 Monad，而是经常用更特殊、更有用的 Monad，
// 比如 Maybe Monad 或者 Either Monad。所以，下面我们来看看 Maybe Monad。

// Monad - 一个示例实现
class Monad {
    constructor(val) {
        this.__value = val;
    }
    static of(val) {// Monad.of 比 new Monad(val) 更简单
        return new Monad(val);
    };
    map(f) {// 应用 map 函数，但是返回另一个 Monad!
        return Monad.of(f(this.__value));
    };
    join() { // 用于在 Monad 外获取值
        return this.__value;
    };
    chain(f) {// 辅助函数，先映射，然后获取值
        return this.map(f).join();
    };
    ap(someOtherMonad) {// 用于处理多个 Monad
        return someOtherMonad.map(this.__value);
    }
}

// Maybe monad  用来检查null, undefined
//eg. 检查用户
// 返回一个Maybe({userObj}) 或者返回 Maybe(null), 但是将数据包裹在Maybe内
//Maybe(user)；
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
  return this.isNothing() ?  Maybe.of(null) :  Maybe.of(f(this.__val))
}
Maybe.prototype.join = function (f) {
  return this.isNothing() ? Maybe.of(null) : this.__val;
}

Left = function(x) {
  this.__val = x;
}
Left.of = function(x){
  return new Left(x)
}

Left.prototype.map = function (f) {
  return this;
}

Left.prototype.join = function(f) {
  return this
}


Right = function (x) {
  this.__val = x;
}

Right.of = function (x) {
  return new Right(x);
}

Right.prototype.map = function (f) {
  return Right.of(f(this.__val));
}

Right.prototype.join = function(f) {
  return this.__val
}

either = R.curry(function(f,g,e){
   switch(e.constructor){
     case Left: return f(e.__val);
     case Right: return g(e.__val);
   }
});

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


chain = R.curry(function(f, m){
  return m.map(f).join()
})
either = R.curry(function(f,g,e){
   switch(e.constructor){
     case Left: return f(e.__val);
     case Right: return g(e.__val);
   }
});

console.log(IO.of("tetris").map(R.concat(" master")));
console.log(Maybe.of(1336).map(add(1)));
console.log(Task.of([{id: 2}, {id: 3}]).map(R.prop('id')));
console.log(Either.of("The past, present and future walk into a bar...").map
(
  concat("it was tense.")
));


var fs = require('fs');
//  readFile :: String -> IO String
var readFile = function(filename) {
  return new IO(function() {
    return fs.readFileSync(filename, 'utf-8');
  });
};

//  print :: String -> IO String
var print = function(x) {
  return new IO(function() {
    console.log(x);
    return x;
  });
}

var cat = R.compose(map(print), readFile);
// IO(IO(" .....content of base.js "))
console.log( cat("base.js") );
// 调用 cat("base.js").unsafePerformIO().unsafePerformIO()

//  safeProp :: Key -> {Key: a} -> Maybe a
var safeProp = R.curry(function(x, obj) {
  return new Maybe(obj[x]);
});
//  safeHead :: [a] -> Maybe a
var safeHead = safeProp(0);

//  firstAddressStreet :: User -> Maybe (Maybe (Maybe Street) )
var firstAddressStreet = R.compose(
  map(map(safeProp('street'))), map(safeHead), safeProp('addresses')
);

var firstAddressStreetChain = R.compose(
  chain(safeProp('street')), chain(safeHead), safeProp('addresses')
);

// Maybe { __val: Maybe { __val: Maybe { __val: [Object] } } }
// 函数中三个可能的失败都用了 Maybe 做预防也很 干净整洁
// 这种嵌套 functor 的模式会时不时地出现,而且是 monad 的主要使用场景。
console.log('firstAddressStreet', firstAddressStreet(
  {addresses: [{street: {name: 'Mulburry', number: 8402}, postcode: "WC2N" }]}
));

console.log('firstAddressStreetChain', firstAddressStreetChain(
  {addresses: [{street: {name: 'Mulburry', number: 8402}, postcode: "WC2N" }]}
));


var mmo = Maybe.of(Maybe.of("nunchucks"));
console.log(mmo);
console.log(mmo.join());
