require('./apFunctor-exercise');
require('../../utils/support');
var Task = require('data.task');
var _ = require('ramda');

// 模拟浏览器的 localStorage 对象
var localStorage = {};


// 练习 1
// ==========
// 写一个函数,使用 Maybe 和 ap() 实现让两个可能是 null 的数值相加。
//  ex1 :: Number -> Number -> Maybe Number
var ex1 = function(x, y) {
  };



// 练习 2
// ==========
// 写一个函数,接收两个 Maybe 为参数,让它们相加。使用 liftA2 代替 ap()。
//  ex2 :: Maybe Number -> Maybe Number -> Maybe Number
var ex2 = undefined;



// 练习 3
// ==========
// 运行 getPost(n) 和 getComments(n),两者都运行完毕后执行渲染页面的操 作。(参数 n 可以是任意值)。
var makeComments = _.reduce(function(acc, c){ return acc+"<li>"+c+"</li>" }, "");
var render = _.curry(function(p, cs) { return "<div>"+p.title+"</div>"+makeComments(cs); });
//  ex3 :: Task Error HTML
var ex3 = undefined;




// 帮助函数
// =====================
function getPost(i) {
  return new Task(function (rej, res) {
    setTimeout(function () { res({ id: i, title: 'Love them futures' }); }, 300);
  });
}

function getComments(i) {
  return new Task(function (rej, res) {
    setTimeout(function () {
      res(["This book should be illegal", "Monads are like spaceburritos"]);
    }, 300);
  });
}
