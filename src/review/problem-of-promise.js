// 

function doSomething() {
  return new Promise((resovle, reject) => {
    setTimeout(function () {
      resovle('doSomething');
    }, 1000);
  })
}

function doSomethingElse() {
  return new Promise((resovle, reject) => {
    setTimeout(function () {
      resovle('doSomethingElse');
    }, 2000);
  })
}

doSomething().then(function () {
  return doSomethingElse();
});

doSomething().then(function () {
  doSomethingElse();
});

doSomething().then(doSomethingElse());

doSomething().then(doSomethingElse);


let db = {
  docs: [{
    id: 1,
    doc: 'book1',
    name: 'liu'
  }, {
    id: 2,
    doc: 'book2',
    name: 'chen'
  }, {
    id: 3,
    doc: 'book3',
    name: 'en'
  }],

  allDocs: () => {
    return new Promise((resovle, reject) => {
      setTimeout(() => {
        resovle({
          rows: db.docs
        })
      }, 1000);
    })
  },
  remove: (doc) => {
    return new Promise((resovle, reject) => {
      setTimeout(function () {
        db.docs = db.docs.filter(innerDoc => innerDoc.doc !== doc);
        resovle();
      }, 1000);
    })

  }
}


// db.allDocs().then( result => {
//   result.rows.map(function (row) {
//     db.remove(row.doc);
//   })
//   // return Promise.all(result.rows.map(function (row) {
//   //   return db.remove(row.doc);
//   // }));
// }).then(function () {
//   console.log(db.docs);
// });



//########## THERE: promises factories

function promiseItem(arg) {
  return new Promise((resovle, reject) => {
    setTimeout(function () {
      resovle(console.log(arg));
    }, 1000);
  });
}


// 返回一个promise的 函数 工厂
let promiseFactories = [
  () => promiseItem(1),
  () => promiseItem(2),
  () => promiseItem(3),
  () => promiseItem(4),
  () => promiseItem(5)
];

//串行 Promise
function createPromiseFactories(promises) {
  return promises.reduce((p, nextPromise) => (p.push(() => nextPromise, p)) , [])
}

function executeSequentially(promiseFactories) {
  let result = Promise.resolve();

  promiseFactories.forEach(prom => {
    result = result.then(prom);
  });
  return result;
}

//串行
// console.log(promiseFactories.reduce((p, c) => ( p = p.then(c), p), Promise.resolve()));


function executeSequentially(promises) {
  var result = Promise.resolve();
  promises.forEach(function (promise) {
    result = result.then(promise);
  });
  return result;
}

// console.log(executeSequentially(promiseFactories));



//############ FIVE:  promises 穿透
var branch = 'b';
function a(result) {
  if(!result) {
    return new Promise( (resovle, reject) => {
      setTimeout(function() {
        branch !== 'a' ? resovle(null) : resovle('a');
      }, 1000);
    })
  }
  return result;
}

function b(result) {
  if(!result) {
    return new Promise( (resovle, reject) => {
      setTimeout(function() {
        branch !== 'b' ? resovle(null) : resovle('b');  
      }, 1000);
    })
  }
  return result;
}


Promise.resolve()
  .then(a)
  .then(b)
  .then(function(r) {
    console.log(r);
  });

