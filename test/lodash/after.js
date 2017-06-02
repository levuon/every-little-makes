const _  = require('lodash')

function after(n, func) {
  if (typeof func != 'function') {
    throw new TypeError('Expected a function')
  }
  return function(...args) {
    // 知道最后一次才返回 func.apply(this, args)执行结果. 
    if (--n < 1) {
      return func.apply(this, args)
    }
  }
}

const list = ['profile', 'settings'];
const done = _.after(list.length, () => console.log('done!'));
list.map( type => asyncSave({ 'type': type, 'complete': done }))

// profile
// settings
// done!

function asyncSave(obj) {
    console.log(obj.type); 
    // 第一次不会执行，只有当 读取到数组最后一个的时候才执行.
    obj.complete()
}

