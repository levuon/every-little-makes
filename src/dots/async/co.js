const co = require('co');
const Promise = require('bluebird');
const pipe = require('../../utils/pipe');


// co ###########
function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

const coTest = co.wrap(function* (n, ms) {
  for (let i = 0; i < n; i++) {
    console.log('i=%s', i);
    yield sleep(ms);
  }
  return n;
});

coTest(10, 500)
  .then(n => console.log('over:，n=%s', n))
  .catch(err => console.error('执行出错：', err));



const bluebirdTest = Promise.coroutine(function* (n, ms) {
  for (let i = 0; i < n; i++) {
    console.log('i=%s', i);
    yield Promise.delay(ms);
  }
  return n;
});

bluebirdTest(10, 500)
  .then(n => console.log('over:，n=%s', n))
  .catch(err => console.error('执行出错：', err));


function addOne(x){
  return x + 1;
  // return new Promise(function(resolve, reject) {
  //   setTimeout(() => resolve(x + 1), 1000)
  // });
}

function double(x) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(x * x), 1000)
  });
}

const lognum = function* (x){
  const result = yield pipe(
    addOne,
    double
  )(x);

  return result;
}

const hahah = Promise.coroutine(lognum);

hahah(2).then(console.log)
