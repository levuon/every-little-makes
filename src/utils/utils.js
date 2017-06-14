
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

module.exports = {
    isPrime,
    randomColor,
    after
}
