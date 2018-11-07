setTimeout(function() {
  console.log(4);
}, 0);

new Promise(resolve => {
  console.log(1);
  for (var i = 0; i < 10000; i++) {
    i == 9999 && resolve();
  }
  console.log(2);
}).then(function() {
  console.log(5);
});

console.log(3);



// Promise.then 是异步执行的，而创建Promise实例（ executor ）是同步执行的。
// setTimeout 的异步和 Promise.then 的异步看起来 “不太一样” ——至少是不在同一个队列中。