//arr is not a iterator, is a iterable. so you can not use 
// the next function -> arr.next();

// let arr = [1,2,3];

// change arr to iterator :

// let arrIter = arr[Symbol.iterator]();
// let arrback = Array.from(arrIter.entries());
// console.log(arrback);

// console.log(arrIter.next()); // { value: 1, done: false }
// console.log(arrIter.next()); // { value: 2, done: false }
// console.log(arrIter.next()); // { value: 3, done: false }
// console.log(arrIter.next()); // { value: undefined, done: true }


// let obj = {name: 'liu', age: 29, gender: 'male'};
//name = liu
// age = 29
// gender = male
// for(let key in obj){
//   console.log(key + ' = ' + obj[key]);
// }


// error, you must convert obj to iterator. and implement iterable protocal.
// for(let key of obj){
//   console.log(key + ' = ' + obj[key]);
// }
// obj[Symbol.iterator] = function() {
//   // let keys = Object.keys(this).sort();
//   // var index = 0;
//   var _this = this;
//   var keys = null;
//   var index = 0;
//   return {
//     next: function () {
//       if (keys === null) {
//         keys = Object.keys(_this).sort();
//       }
//       return {
//         value: keys[index], done: index++ >= keys.length
//       };
//     }
//   }
// }

// let objIter = obj[Symbol.iterator]();

// for(let key of obj){
//   console.log(key + ' = ' + obj[key]);
// }




// //#####
// var list = [3, 5, 7];
// list.foo = 'bar';

// for (var key in list) {
//   console.log(key); // 0, 1, 2, foo
// }

// for (var value of list) {
//   console.log(value); // 3, 5, 7
// }

// var string = "hello";

// // for (var key, value of string) {
// //   console.log(key, value); // h, e, l, l, o
// // }

// var hello = 'world';
// var [first, second, ...rest] = [...hello];
// console.log(first, second, rest);



// ex1
// var ids = {
//   [Symbol.iterator]: function () {
//     var index = 0;

//     return {
//       next: function () {
//         return { value: 'id-' + index++, done: false };
//       }
//     };
//   }
// };
// x
// var counter = 0;
// for (var value of ids) {
//   console.log(value);
//   if (counter++ > 1000) { // let's make sure we get out!
//     break;
//   }
// }

// ###########generator
// function *foo(){
//   yield 1;
//   yield 2;
//   yield 3;
// }

// const objGen = {
//   *foo() {
//     yield 1;
//   }
// }

// const iterFoo = foo();
// const iterFooGen = objGen.foo();

// console.log('foo',iterFoo.next());
// console.log('foo',iterFooGen.next());

// ###########a look back at functional iterators

const Stack = () => ({
  array: [],
  index: -1,
  push: function (value) {
    // console.log(this, value);
    return this.array[this.index += 1] = value;
  },
  pop: function () {
    const val = this.array[this.index];
    this.array[this.index] = undefined;
    if (this.index > 0) {
      this.index -= 1;
    }
    return val;
  },
  isEmpty: function () {
    return this.index < 0;
  },
  iterator: function () {
    let iterationIndex = this.index;
    return () => {
      if (iterationIndex > this.index) {
        iterationIndex = this.index;
      }
      if (iterationIndex < 0) {
        return {
          done: true
        }
      } else {
        return {
          done: false,
          value: this.array[iterationIndex--]
        }
      }
    }
  }
})



const stack = Stack();

stack.push("Greetings");
stack.push("to");
stack.push("you!")

const iter = stack.iterator();
console.log(iter());

console.log(iter().value);
console.log(iter().value);
console.log(iter().value);