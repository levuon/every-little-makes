
require('../../utils/support.js');
const R = require('ramda');
const moment = require('moment');
const Task = require('data.task');

// ************* 一： CONTAINER ***************
console.log("############# Container START ############");
// 可以存值
Container = function(x) {
  this.__val = x;
}
// of 方法不是用来避免使用 new 关键字的,而是用来把值放到默认最小化上下文(default minimal context)中的。
// 是的, of 没有真正地取代构造器——它是一个我们称之为 pointed 的重要接口的一部分
Container.of = function(x) {
  return new Container(x);
}
console.log( Container.of(3) ); // Container { Rval: 3 }

// Functor: functor 是实现了 map 函数并遵守一些特定规则的容器类型。
// 一旦容器里有了值,不管这个值是什么,我们就需要一种方法来让别的函数能够操作它。
Container.prototype.map = function (f) {
  return Container.of(f(this.__val))
}

// Container { Rval: 4 }
console.log(Container.of(2).map(function(two){ return two + 2 }));
// Container { Rval: 'FLAMETHROWERS' }
console.log(Container.of("flamethrowers").map(function(s){ return s.toUpperCase() }));

console.log("############# Container END ############");
// ************* 二： MAYBE ***************
console.log("############# MAYBE START ############");

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

// MAYBE 会先检查 自己的值是否为空,然后才调用传进来的函数。这样我们在使用
// 的时候就能 避免恼人的空值了(注意这个实现出于教学目的做了简化)。

//Maybe { __val: 'Malkovich Malkovich' }
console.log(Maybe.of("Malkovich Malkovich").map(match(/a/ig)));
// Maybe { __val: null }
console.log(Maybe.of(null).map(match(/a/ig)));
// Maybe { __val: null }
console.log(Maybe.of({name: "Boris"}).map(R.prop("age")).map(add(10)));
// Maybe { __val: 24 }
console.log(Maybe.of({name: "Dinah", age: 14}).map(R.prop("age")).map(add(10)));

console.log("############# MAYBE END ############");

// ########### 三： 释放容器里的值 ##########
console.log("############# release START ############");
// var map = curry(function(f, anyRfunctorRatRall){
//   return anyRfunctorRatRall.map(f)
// })
const finishTransaction = function(x) {
  return `Your balance is $${x.balance}`
}

//  withdraw :: Number -> Account -> Maybe(Account)
var withdraw = R.curry(function(amount, account) {
  return account.balance >= amount ?
    Maybe.of({balance: account.balance - amount}) :
    Maybe.of(null);
});

var maybe = R.curry(function(x, f, m) {
  return m.isNothing() ? x : f(m.__val);
});
//  getTwenty :: Account -> String
var getTwenty = R.compose(
  maybe("You're broke!", finishTransaction), withdraw(20)
);
console.log( getTwenty({ balance: 200.00}) );
// "Your balance is $180.00"
console.log( getTwenty({ balance: 10.00}) );
// "You're broke!"


console.log("############# release END ############");

// ######### 四： “纯”错误处理 #############
console.log("############# E__OR START ############");
// Left 和 Right 为Either的抽象类型的两个子类
Left = function(x) {
  this.__val = x;
}
Left.of = function(x){
  return new Left(x)
}

Left.prototype.map = function (f) {
  return this;
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

// Left { __val: 'rain' }
console.log(Left.of('rain').map(function(str){return 'b'+str}));
// Right { __val: 'brain' }
console.log(Right.of('rain').map(function(str){return 'b'+str}));

// Right('localhost')
console.log( Right.of({host: 'localhost', port: 80}).map(R.prop('host')));
// Left { __val: 'rolls eyes...' }
console.log( Left.of("rolls eyes...").map(R.prop("host")));

// ATTENTION: Left 会无视 我们的map请求。

//eg.
var getAge = R.curry(function(now, user) {
  var birthdate = moment(user.birthdate, 'YYYY-MM-DD');
  if(!birthdate.isValid()) return Left.of('Birth Date could not be parse');
  return Right.of(now.diff(birthdate, 'years'))
});

// Right { __val: 11 }
console.log(getAge(moment(), {birthdate: '2005-12-12'}));
// Left { __val: 'Birth Date could not be parse' }
console.log(getAge(moment(),{birthdate: '200113041'}));

// 结合compose

var fortune = R.compose(concat('If you survive, you will be '), add(10));

var zoltar = R.compose(map(console.log.bind(console)), map(fortune), getAge(moment()));

// If you survive, you will be 21
// Right { __val: undefined }
console.log(zoltar({birthdate: '2005-12-12'}));

// Left { __val: 'Birth Date could not be parse' }
console.log(zoltar({birthdate: 'balloons!'}));

// ATTENTION: 一个函数在调用的时候,如果被 map 包裹了,
// 那么它就会从一个非 functor 函数转换为一个 functor 函数
// 我们把这个过程叫 lift.
// 这样能够得到更简单、重用性更高的函数.
console.log("############# E__OR END ############");
// ################ 五  EITHER ###############
console.log("############# EITHER START ############");
// 上面例子仅仅将 Either 当作一个错误消息的容器， EITHER的能耐远不止于此
// 比如: 它表示了逻辑或, 再比如: 它体现了范畴学里 coproduct 的概念
// 还比如, 它是 标准的 sum type(或者叫不交并集,disjoint union of sets) 等等。

// EITHER 作为一个Functor, 就用它处理错误
either = R.curry(function(f,g,e){
   switch(e.constructor){
     case Left: return f(e.__val);
     case Right: return g(e.__val);
   }
 });

var zoltar = R.compose(console.log, either(id, fortune), getAge(moment()));

// If you survive, you will be 21
// undefined
console.log(zoltar({birthdate: '2005-12-12'}));

// Birth Date could not be parse
// undefined
console.log(zoltar({birthdate: 'balloons!'}));
console.log("############# EITHER END ############");

// ############# 六: IO ###############
console.log("############# IO START ############");

// 不纯的
var signUp = function(attrs) {
  var user = saveUser(attrs);
  welcomeUser(user);
};
// 纯的 通过延迟方式来让一个函数变成纯函数。
var signUp = function(Db, Email, attrs) {
  return function() {
    var user = saveUser(Db, attrs);
    welcomeUser(Email, user);
  };
};

// 为什么是 纯函数？ 因为 同一输入，就总能返回同一输出。
// 输入 Db, Email, attrs，返回总是一个包涵处理参数(Db, Email, attrs)的函数。

// QUESTION: 这样是纯函数，但是获取不到里面的数据，看不到里面具体信息
// 就像是你收藏的全新未拆封的玩偶,不 能拿出来玩有什么意思。
// 办法：

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
//: IO 跟之前的 functor 不同的地方在于,它的 __value 总是一个函数
// IO 把非纯执行动作(impure action) 捕获到包裹函数里,目的是延迟执行这个非纯动作

var ioRwindow = new IO(function(){ return window; });
// console.log(ioRwindow.__val); // function(){return window}
// console.log(ioRwindow.__val()); // Window

// .__val()执行后 =>
// IO(xxx) // xxx 屏幕浏览器宽度
console.log(ioRwindow.map(function(win){ return win.innerWidth }));

// .__val()执行后 =>
// IO(["http:", "", "localhost:8000", "blog", "posts"])
// ["file:", "", "", "Users", "liuhuan", "work", "workspace", "own-git", "js", "every-little-makes", "test", "index.html"]
console.log(ioRwindow.map(R.prop('location')).map(R.prop('href')).map(split('/')));
``
var $ = function(selector) {
  return new IO(function(){
    return document.querySelectorAll(selector);
  });
}

// IO('I am some inner html')
console.log( $('#myDiv').map(R.head).map(function(div){ return div.innerHTML; }) );

/*
//eg.
// Url: IO String
var url = new IO(function(){return window && window.location.href});

// toPairs = String --> [[String]]
var toPairs = R.compose(map(split('=')), split('&'));

// params = string -->[[String]]
var params = R.compose(toPairs, last, split("?"))

// findParam:: String -->IO Maybe [String]
var findParam = function(key){
  return map(R.compose(Maybe.of, filter(R.compose(eq(key), head)), params), url)
}

// file:///Users/liuhuan/work/workspace/own-git/js/every-little-makes/test/index.html?abc=123
// Maybe(['searchTerm', 'wafflehouse'])
console.log( findParam("abc").unsafePerformIO().__val );
*/
console.log("############# IO END ############");



/*
  F 为一个Functor

            f
      a  ---------> b
      |             |
  F.of|             | F.of
      |    map(f)   |
     F a --------->F b

*/
// eg.
// topRoute :: String -> Maybe(String)
var topRoute = R.compose(Maybe.of, R.reverse);

//  bottomRoute :: String -> Maybe(String)
var bottomRoute = R.compose(map(R.reverse), Maybe.of);

// Maybe { __val: 'ih' }
console.log(topRoute("hi"));
// Maybe { __val: 'ih' }
console.log(bottomRoute("hi"));

/*
                reverse
         "hi" ---------> 'ih'
          ⎮                ⎮
  Maybe.of ⎮                ⎮ Maybe.of
          ↓   map(reverse)  ↓
  Maybe('hi') ---------->  Maybe('ih')

*/


var nested = Task.of([Right.of("pillows"), Left.of("no sleep for you")]);
console.log( map(map(map(toUpperCase)), nested) );

var Compose = function(f_g_x){
  this.getCompose = f_g_x;
}

Compose.prototype.map = function (f) {
  return new Compose(map(map(f), this.getCompose))
}
var tmd = Task.of(Maybe.of("Rock over London"))
var ctmd = new Compose(tmd);

// Compose(Task(Maybe("Rock over London, rock on, Chicago")))
console.log(map(concat(", rock on, Chicago"), ctmd));

// Task(Maybe("Rock over London, rock on, Chicago"))
console.log( ctmd.getCompose );
