

require('../../src/utils/support')
var moment = require('moment');
var R = require('ramda');
var Container = function( x ) {
  this.__val = x;
}

Container.of = function( x ) {
  return new Container(x);
}

//  functor 是实现了 map 函数并遵守一些特定规则的容器类型。
Container.prototype.map = function(f) {
  // return f(this.__val);  
  return Container.of(f(this.__val)); //继续将值存入 Container 可以连续使用 Container里面的方法
}

console.log(Container.of(Container.of({name: "yoda"})));
console.log(Container.of(2).map(function(two){ return two + 2 }).map(function(two){ return two + 2 }));



var Maybe = function(x){
  this.__value = x;
}
Maybe.of = function(x) {
  return new Maybe(x);
}

Maybe.prototype.isNothing = function(){
  return this.__value === null || this.__value === undefined;
}

Maybe.prototype.map = function(f) {
  return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
}

var a;
console.log(Maybe.of(a).map(console.log));
console.log(Maybe.of("Malkovich Malkovich").map(match(/a/ig)));
console.log(Maybe.of(null).map(match(/a/ig)));



var Left = function(x) {
  this.__value = x;
}

Left.of = function(x) {
  return new Left(x);
}

Left.prototype.map = function(f){
  return this;
}

var Right = function (x) {
  this.__value = x;
}

Right.of = function(x) {
  return new Right(x);
}

Right.prototype.map = function(f) {
  return Right.of(f(this.__value));
}

var getAge = curry(function(now, user) {
  var birthdate = moment(user.birthdate, 'YYYY-MM-DD');
  if(!birthdate.isValid()) return Left.of("Birth date could not be parsed");
  return Right.of(now.diff(birthdate, 'years'));
});

var fortune  = R.compose(concat("If you survive, you will be "), add(1));
var zoltar = R.compose(R.map(console.log), R.map(fortune), getAge(moment()));

zoltar({birthdate: '2005-12-12'});
zoltar({birthdate: 'balloons!'});



var either = curry(function(f, g, e) {
  switch(e.constructor) {
    case Left: return f(e.__value);
    case Right: return g(e.__value);
  }
});
//  zoltar :: User -> _
var zoltar = R.compose(console.log, either(id, fortune), getAge(moment()));
zoltar({birthdate: '2005-12-12'});
// "If you survive, you will be 10"
// undefined
zoltar({birthdate: 'balloons!'});



//IO 延迟执行
var IO = function(f){
  this.unsafePerformIO = f;
}

IO.of = function(x) {
  return new IO(function(){
    return x;
  });
}

IO.prototype.map = function(f) {
  return new IO(R.compose(f, this.unsafePerformIO))
}

let window = {
  location: {
    href: 'https://localhost:8080/node/window?searchTerm=123'
  }
}
var url = new IO(function() { return window.location.href; });
var toPairs = R.compose(map(split('=')), split('&'));
var params = R.compose(toPairs, last, split('?'));
var findParam = function(key) {
  return R.map(R.compose(Maybe.of, R.filter(R.compose(eq(key), head)), params), url);
};

// console.log(findParam("searchTerm").unsafePerformIO().__value);



console.log(Maybe.of(1336).map(add(1)));
console.log(IO.of("tetris").map(concat(" master")).unsafePerformIO());


var fs = require('fs');
var readFile = function(filename) {
  return new IO(function() {
    return fs.readFileSync(filename, 'utf-8');
  });
};
//  print :: String -> IO String
var print = function(x) {
  return new IO(function() {
    console.log(x);
return x; });
}
// Example
// ===========================
//  cat :: IO (IO String)
var cat = R.compose(map(print), readFile);

console.log(cat(".git/config").unsafePerformIO().unsafePerformIO());
