const Rx = require('rxjs')
// const { log } = require('../utils/utils')

function log() {
  console.log.apply(null, arguments)
}


// function loadMagazine() {
//   return [{
//     title: 'lev',
//     month: 'July'
//   }, {
//     title: 'liu',
//     month: 'June'
//   }, {
//     title: 'en',
//     month: 'Apirl'
//   }]
// }


// // Rx.Observable.interval(1000)
// //   .take(5)
// //   .subscribe(log)

// // Rx.Observable.of(1,2,3,4,5)
// //   .filter(val => (val % 2) === 0 )
// //   .map(num => num * num)
// //   .subscribe(log(''));

// // const lowest = arr => arr.sort().shift();
// // let source = [3,1,9,8,3,7,4,6,5];

// // let result = lowest(source);
// // console.log(result);
// // console.log(source);

// const isEven = num => num % 2 === 0;
// const square = num => num * num;
// const add = (a, b) => a + b;
// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// let res = arr.filter(isEven).map(square).reduce(add); //-> 220
// console.log(res);

// function BufferIterator(arr, bufferSize) {
//   this[Symbol.iterator] = function () {
//     let nextIndex = 0;
//     return {
//       next: function () {
//         if (nextIndex >= arr.length) {
//           return {
//             done: true
//           }
//         }

//         let buffer = new Array(bufferSize);
//         for (let i = 0; i < bufferSize; i++) {
//           buffer[i] = (arr[nextIndex++]);
//         }
//         return {
//           value: buffer,
//           done: false
//         };
//       }
//     }
//   }
// }

// for (let i of new BufferIterator(arr, 2)) {
//   console.log(i);
// }


// // let source = Rx.Observable.of(['R', 'x', 'J', 'S'])[Symbol.iterator]();

// // for(let keyEvent of source){
// //   console.log(event.keyCode);
// // }

// /// Rx.Observable.from Rx.Observable.fromPromise
// const map = new Map();
// map.set('key1', 'value1');
// map.set('key2', 'value2');
// Rx.Observable.from(map).forEach(console.log);

// Rx.Observable.from('RxJS')
//   .subscribe(console.log);



// const increment = val => val + 1;

// const fortyTwo = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(42);
//   }, 5000);
// });

// Rx.Observable.fromPromise(fortyTwo)
//   .map(increment)
//   .subscribe(console.log);
// console.log('Program terminated');



// addEmitter.on('add', (a, b) => {
//   console.log(a + b); //-> Prints 5
// });

// Rx.Observable.fromEvent(addEmitter, 'add', (a, b) => ({
//     a: a,
//     b: b
//   }))
//   .map(input => input.a + input.b)
//   .subscribe(console.log); //-> 5
// addEmitter.emit('add', 2, 3);

// function* fibonacci() {
//   let first = 1,
//     second = 1;
//   for (;;) {
//     let sum = second + first;
//     yield sum;
//     first = second;
//     second = sum;
//   }
// }
// const iter = fibonacci();
// console.log(iter.next()); //-> {value: 2, done: false}
// console.log(iter.next()); //-> {value: 3, done: false}
// console.log(iter.next()); //-> {value: 5, done: false}



const observable = events => {
  const INTERVAL = 1 * 1000;
  let schedulerId;
  return {
    subscribe: observer => {
      schedulerId = setInterval(() => {
        if (events.length === 0) {
          observer.complete();
          clearInterval(schedulerId);
          schedulerId = undefined;
        } else {
          observer.next(events.shift());
        }
      }, INTERVAL);
      return {
        unsubscribe: () => {
          if (schedulerId) {
            clearInterval(schedulerId);
          }
        }
      };
    }
  }
}
let sub = observable([1, 2, 3]).subscribe({
  next: console.log,
  complete: () => console.log('Done!')
}); //-> 1