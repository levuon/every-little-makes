const co = require('co')


let fn = co.wrap(function* (val) {
  return yield Promise.resolve(val);
})

fn(1).then(function (val) {
  console.log(val);
}, function (err) {
  console.error(err.stack);
});