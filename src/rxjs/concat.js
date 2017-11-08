const Rx = require('rxjs');
const {
  log
} = require('../utils/utils')



// 发出 1,2,3
const sourceOne = Rx.Observable.of(1, 2, 3);
// 发出 4,5,6
const sourceTwo = Rx.Observable.of(4, 5, 6);


//一： 先发出 sourceOne 的值，当完成时订阅 sourceTwo
// const example = sourceOne.concat(sourceTwo);

//二： 作为静态方法使用
// const example = Rx.Observable.concat(
//   sourceOne,
//   sourceTwo
// );

//三 延迟3秒，然后发出
const sourceThree = sourceOne.delay(3000);
// sourceTwo 要等待 sourceOne 完成才能订阅
const example = sourceThree.concat(sourceTwo);
// 输出: 1,2,3,4,5,6
// const subscribe = example.subscribe(val => console.log('Example: Basic concat:', val));


// 当 source 永远不完成时，随后的 observables 永远不会运行
const sourceNever = Rx.Observable
  .concat(
    Rx.Observable.interval(1000),
    Rx.Observable.of('This', 'Never', 'Runs')
  )
// 输出: 1,2,3,4....
// const subscribeNever = sourceNever.subscribe(val => console.log('Example: Source never completes, second observable never runs:', val));



const sourceConcatAll = Rx.Observable.interval(2000);

const exampleConcatAll = sourceConcatAll.map( v => Rx.Observable.of(v + 10)).concatAll();

exampleConcatAll.subscribe(log('Example with Basic Observable:'))