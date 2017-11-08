const R = require('ramda');
// 检验质数
function isPrime( n ) {
	return !(/^.?$|^(..+?)\1+$/).test( '1'.repeat( n ) )
}

// 随机颜色
function randomColor() {
    return `#${ Math.floor( Math.random() * (2 << 23) ).toString( 16 ) }`
}

function after(n, func) {
  if (typeof func != 'function') {
    throw new TypeError('Expected a function')
  }
  return function(...args) {
    if (--n < 1) {
      return func.apply(this, args)
    }
  }
}

const once = fn => {
	let done = false;
	return () => {
		return done ? void 0 : ((done = true, fn.apply(this, arguments)))
	}
}

const excuteTimes = n => fn => {
	return () => {
		return n === 0 ? void 0 : (n--, fn.apply(this, arguments))
	}
}

function inherits(ctor, superCtor) {
  if(ctor === undefined || ctor === null){
    throw new Error('ERR_INVALID_ARG_TYPE', 'ctor', 'function');
  }
  if(superCtor === undefined || superCtor === null) {
    throw new Error('ERR_INVALID_ARG_TYPE', 'superCtor', 'function');
  }
  if(superCtor.prototype === null){
    throw new errors.TypeError('ERR_INVALID_ARG_TYPE', 'superCtor.prototype',
      'function');
  }
  ctor.super__ = superCtor;
  Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
}



function timeout(sec) {
  return function(target, key, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function(...arg) {
      setTimeout(() => {
        originalMethod.apply(this, args);
      }, sec);
    }
  }
}



const log = R.curry(function log(msg, val) {
  console.log.call(null, msg, val);
});

module.exports = {
    isPrime,
    randomColor,
    after,
		once,
    excuteTimes,
    inherits,
    timeout,
    log
}
