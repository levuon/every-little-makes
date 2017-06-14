require('../../utils/support');
require('./monad');
const Task = require('data.task');

const _ = require('ramda');

console.log("############### exercise #################");

// 练习 1
// ==========
// 给定一个 user,使用 safeProp 和 map/join 或 chain 安全地获取 sreet的 name
console.log('###### 1: #####');
var safeProp = _.curry(function (x, o) { return Maybe.of(o[x]);});
var user = {
  id: 2,
  name: "albert",
  address: {
    street: {
      number: 22,
      name: 'Walnut St'
    }
  }
};
var ex1 = undefined;
ex1 = _.compose(map(map(safeProp('name'))), map(safeProp('street')), safeProp('address'));
var ex1Chain;
ex1Chain = _.compose(chain(safeProp('name')), chain(safeProp('street')), safeProp('address'))
// Maybe { __val: Maybe { __val: Maybe { __val: 'Walnut St' } } }
console.log(ex1(user));
// Maybe { __val: 'Walnut St' }
console.log(ex1Chain(user));


// 练习 2
// ==========
// 使用 getFile 获取文件名并删除目录,所以返回值仅仅是文件,然后以纯的方式 打印文件
console.log('###### 2: #####');
var getFile = function() {
  return new IO(function(){ return __filename; });
}
var pureLog = function(x) {
  return new IO(function(){
    console.log(x);
    return 'logged ' + x;
  });
}
var ex2 = undefined;

// normal
ex2 = _.compose(map(_.compose(pureLog, _.last, split('/'))) ,getFile);

ex2Chain = _.compose(chain(_.compose(pureLog, _.last, split('/'))), getFile)

// logged monad-exercise.js
console.log(ex2('base.js').unsafePerformIO().unsafePerformIO());

// IO { unsafePerformIO: [Function] }
console.log(ex2Chain('base.js'));



// 练习 3
// ==========
// 使用 getPost() 然后以 post 的 id 调用 getComments()
console.log('###### 3: #####');
var getPost = function(i) {
  return new Task(function (rej, res) {
    setTimeout(function () {
      res({ id: i, title: 'Love them tasks' });
    }, 300);
}); }
var getComments = function(i) {
  return new Task(function (rej, res) {
    setTimeout(function () {
      res([
        {post_id: i, body: "This book should be illegal"},
        {post_id: i, body: "Monads are like smelly shallots"}
      ]);
    }, 300); });
}

var ex3 = _.compose( _.compose(getComments, _.prop('id')), chain, getPost)
// Task { fork: [Function], cleanup: [Function] }
console.log(ex3(1));
console.log(ex3(1).fork(
  err => console.log(err.message),
  data => console.log(data)
));

// 练习 4
// ==========
// 用 validateEmail、addToMailingList 和 emailBlast 实现 ex4 的类型 签名
//  addToMailingList :: Email -> IO([Email])
var addToMailingList = (function(list){
  return function(email) {
    return new IO(function(){
      list.push(email);
      return list;
}); }
})([]);
function emailBlast(list) {
  return new IO(function(){
    return 'emailed: ' + list.join(',');
  });
}
var validateEmail = function(x){
  return x.match(/\S+@\S+\.\S+/) ? (new Right(x)) : (new Left('invalid email'));
}
//  ex4 :: Email -> Either String (IO String)
var ex4 = undefined, ex4Chain;

// first
ex4 = _.compose(map(map(emailBlast)), map(addToMailingList) , validateEmail)
// second
ex4Chain = _.compose( emailBlast, chain(addToMailingList), validateEmail)
// answer
ex4v = _.compose(_.map(_.compose(chain(emailBlast), addToMailingList)), validateEmail);


// Right { __val: IO { unsafePerformIO: [Function] } }
console.log('ex4:', ex4('levuon@163.com'));
// Left { __val: 'invalid email' }
console.log('!ex4:', ex4('levucom'));
// IO { unsafePerformIO: [Function] }
console.log('ex4Chain:', ex4Chain('levuon@163.com'));

console.log('ex4v', ex4v('levuon@163.com').__val.unsafePerformIO());
