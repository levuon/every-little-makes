
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

module.exports = {
    isPrime,
    randomColor,
    after,
		once,
		excuteTimes
}
