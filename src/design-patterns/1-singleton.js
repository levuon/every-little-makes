/**
 * 单例模式
 * 传统的单实例在javascript无意义。
 *
 */
var Singleton = function(name) {
  this.name = name;
  this.instance = null;
};
Singleton.prototype.getName = function() {
  console.log(this.name);
};

Singleton.getInstance = function(name) {
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
};

// Singleton.getInstance = (function() {
//   var instance = null
//   return function(name) {
//     if(!instance) {
//       instance = new Singleton(name)
//     }
//     return instance;
//   }
// })()

var a = Singleton.getInstance('liuhuan');
var b = Singleton.getInstance('liuhuan2');
console.log(a === b);

/**
 * 使用代理方式生成单实例
 *
 * 缓存代理
 */
var CreateDiv = function(html) {
  this.html = html;
  this.init();
};

CreateDiv.prototype.init = function() {
  // var div = document.createElement('div');
  // div.innerHTML = this.html;
  // document.body.appendChild(div);
};

var ProxySingletonCreateDiv = (function() {
  var instance;
  return function(html) {
    if (!instance) {
      instance = new CreateDiv(html);
    }
    return instance;
  };
})();

var a = new ProxySingletonCreateDiv('div1');
var b = new ProxySingletonCreateDiv('div2');

console.log('代理模式单实例', a === b);



// 通用singleton
var getSingleton = function(fn) {
  var result;
  return function() {
    return result || (result = fn.apply(this, arguments));
  };
};
