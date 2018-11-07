/*
 * 代理模式
 */
var { log } = require('./utils') 

var Flower = function() {}

var xiaoming = {
  sendFlower: function(target) {
    // 可以不再这里new 一个对象，这样开销很大
    var flower = new Flower();
    target.receiveFlower(flower)
  }
}

var B = {
  receiveFlower: function() {
    A.listenGoodMood(function() {
      //可以在这里new一个对象， 延迟创建flower对象
      var flower = new Flower()
      A.receiveFlower(flower)
    })
  }
}

var A = {
  receiveFlower: function(flower) {
    console.log('recieve flower');
  },
  listenGoodMood: function(fn) {
    setTimeout(function(){
      fn();
    }, 3000)
  }
}

xiaoming.sendFlower(B);



// 保护代理 && 虚拟代理


var mult = function() {
  console.log('start calculate')
  var a = 1;
  for (let i = 0; i < arguments.length; i++) {
    a = a * arguments[i]
  }
  return a;
}

log(mult(2, 3))
log(mult(2, 3, 4))

var proxyMult = (function() {
  var cache = {};
  return function() {
    var arg = Array.prototype.join.call(arguments, ',');
    for (arg in cache) {
      return cache[arg]
    };
    return cache[arg] = mult.apply(this, arguments)
  }
})();

log(proxyMult(1,2,3,4))
log(proxyMult(1,2,3,4))

// 高阶函数动态创建代理

