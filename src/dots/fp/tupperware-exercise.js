require('../../utils/support');
require('./tupperware');
var Task = require('data.task');
var _ = require('ramda');
const Maybe = require('ramda-fantasy').Maybe;
const Either = require('ramda-fantasy').Either;
// const Left = Either.Left;
// const Right = Either.Right;


function Identity(x){
  return x;
}
Identity.of = function(x){
  return new Identity(x)
}

// 练习 1
// ==========
// 使用 _.add(x,y) 和 _.map(f,x) 创建一个能让 functor 里的值增加的函数
var ex1 = undefined

ex1 = _.map(_.add(1))
console.log(ex1(1));


//练习 2
// ==========
// 使用 _.head 获取列表的第一个元素
var xs = Identity.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do']);
var ex2 = undefined

console.log(xs); // [ 'do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do' ]
ex2 = _.map(_.head);
console.log(ex2(xs)); //  'd', 'r', 'm', 'f', 's', 'l', 't', 'd' ]



// 练习 3
// ==========
// 使用 safeProp 和 _.head 找到 user 的名字的首字母
var safeProp = _.curry(function (x, o) { return Maybe.of(o[x]); });
var user = { id: 2, name: "Albert" };
var ex3 = undefined

ex3 = _.compose(_.map(_.head), safeProp('name'))
console.log(ex3(user)); // Just { value: 'A' }


// 练习 4
// ==========
// 使用 Maybe 重写 ex4,不要有 if 语句
var ex4 = function (n) {
  if (n) { return parseInt(n); }
};
var ex4 = undefined

// 1: 转换Functor->Maybe. 2: 使用 parseInt 用map包裹
ex4 = _.compose(_.map(parseInt), Maybe.of);
console.log(ex4(12).value);

// 练习 5
// ==========
// 写一个函数,先 getPost 获取一篇文章,然后 toUpperCase 让这片文章标题 变为大写
// getPost :: Int -> Future({id: Int, title: String})
var getPost = function (i) {
  return new Task(function(rej, res) {
    setTimeout(function(){
      res({id: i, title: 'Love them futures'})
  }, 300) });
}

// 1: getPost 获取文章 2: 获取标题。 3: 转大写
var ex5 = undefined;
// Wrong:  getPost 返回是一个Functor， 无法直接调用 _.prop必须用map包裹
// ex5 = _.compose(_.map(toUpperCase), _.prop('title'), getPost);
//Right:
var updateTitle = _.compose(toUpperCase, _.prop('title'))
ex5 = _.compose(_.map(updateTitle), getPost)

console.log(ex5(1).fork(
  (err) => console.log('1'),
  data => console.log(data) // LOVE THEM FUTURES
));


// 练习 6
// ==========
// 写一个函数,使用 checkActive() 和 showWelcome() 分别允许访问或返回 错误

var showWelcome = _.compose(add( "Welcome "), _.prop('name'), trace('showWelcome begin: '))
var checkActive = function(user) {
 return user.active ? Right.of(user) : Left.of('Your account is not active')
}
var ex6 = undefined

ex6 = _.compose(_.map(showWelcome), checkActive);
console.log('ex6:', ex6({active: true, name: 'lev'}).__val);



// 练习 7
// ==========
// 写一个验证函数,检查参数是否 length > 3。如果是就返回 Right(x),否则 就返回
// Left("You need > 3")
var ex7 = function(x) {
  return undefined // <--- write me. (don't be pointfree)
}

ex7 = function (x) {
    return x.length > 3 ? Right.of(x) : Left.of('You need > 3')
}
console.log('ex7:', ex7([1,2,3,4]).__val);



// 练习 8
// ==========
// 使用练习 7 的 ex7 和 Either 构造一个 functor,如果一个 user 合法就 保存它,否则
// 返回错误消息。别忘了 either 的两个参数必须返回同一类型的数据。
var save = function(x){
  return new IO(function(){
    console.log("SAVED USER!");
    return x + '-saved';
  });
}

var ex8 = _.compose(either(IO.of, save), ex7);

console.log('ex8', ex8('lev1').unsafePerformIO());
