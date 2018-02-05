
const { log } = require('../utils/utils')
// JS 6 种继承方式

// 一: 原型链继承
log("############一：prototype")
/**
 * Advantage -> easy to implement
 * 
 * Disadvantage -> a: 修改sub1.arr后sub2.arr也变了，因为来自原型对象的引用属性是所有实例共享的。
 *                    可以这样理解：执行sub1.arr.push(2);先对sub1进行属性查找，找遍了实例属性（在本例中没有实例属性），
 *                    没找到，就开始顺着原型链向上找，拿到了sub1的原型对象，一搜身，发现有arr属性。
 *                    于是给arr末尾插入了2，所以sub2.arr也变了.
 *                 b: 创建子类实例时，无法向父类构造函数传参
 * 
 */
function Super() {
  this.val = 1;
  this.arr = [1];
}

function Sub(){}

Sub.prototype = new Super();

var sub1 = new Sub();
var sub2 = new Sub();

sub1.val = 2;
sub1.arr.push(2);
log(sub1.val);    // 2
log(sub2.val);    // 1

log(sub1.arr);    // 1, 2
log(sub2.arr);    // 1, 2


// 二: 借助构造函数
/**
 *  Advantage -> a: 解决了子类实例共享父类引用属性的问题
 *               b: 创建子类实例时，可以向父类构造函数传参    *****两个缺陷瞬间修复
 *  
 *  Disadvantage -> 无法实现函数复用，每个子类实例都持有一个新的fun函数，太多了就会影响性能，内存爆炸。
 */
log("############二：constructor")
function Super2() {
  this.val = 1;
  this.arr = [1];
  
  this.fun = function() {}
}

function Sub2(val) {
  // 借父类的构造函数来增强子类实例，等于是把父类的实例属性复制了一份给子类实例装上了（完全没有用到原型）
  Super2.call(this, val);
}

var sub1 = new Sub2(1);
var sub2 = new Sub2(2);
sub1.arr.push(2);
log(sub1.val);    // 1
log(sub2.val);    // 2

log(sub1.arr);    // 1, 2
log(sub2.arr);    // 1

log(sub1.fun === sub2.fun);   // false

// 三. 组合继承（最常用）
/**
 * Advantage -> a:不存在引用属性共享问题
 *              b:可传参
 *              c:函数可复用
 * Disadvantage -> （一点小瑕疵）子类原型上有一份多余的父类实例属性，因为父类构造函数被调用了两次，
 *                  生成了两份，而子类实例上的那一份屏蔽了子类原型上的。。。
 *                  又是内存浪费，比刚才情况好点，不过确实是瑕疵
 */
log("############三：combination")
function Super3(){
  // 只在此处声明基本属性和引用属性
  this.val = 1;
  this.arr = [1];
}
Super3.prototype.fun1 = function() {}
Super3.prototype.fun2 = function() {}

function Sub3(){
  Super3.call(this);   // 核心
  // ...
}
Sub3.prototype = new Super();    // 核心
var sub1 = new Sub3(1);
var sub2 = new Sub3(2);
log(sub1.fun === sub2.fun);   // true


//四： 寄生组合继承（最佳方式）
log("############四： parasitism combination")
/**
 * 优点：完美了
 * 缺点：理论上没有了（如果用起来麻烦不算缺点的话。。）
 * 
 */

function create(obj){   // 类似Object.create
  var F = function(){};
  F.prototype = obj;
  return new F();
}
function Super4(){
  this.val = 1;
  this.arr = [1];
}
//  在此处声明函数
Super4.prototype.fun1 = function(){};
Super4.prototype.fun2 = function(){};

function Sub4(){
  Super.call(this);   // 核心
  // ...
}

// 一个实例的prototype需要 constructor和__proto__
// Sub4.prototype = {
//   constructor: Sub4
//   __proto__: Super.prototype
// }

var proto = create(Super.prototype); // 核心
proto.constructor = Sub4;            // 核心
Sub4.prototype = proto;              // 核心


var sub = new Sub4();
log(sub.val);
log(sub.arr);