//###########  _aperture
function _aperture(len, list) {
  let idx = 0;
  let limit = list.length - (len - 1);
  let acc = new Array(limit > 0 ? limit : 0);
  while (idx < limit) {
    acc[idx] = Array.prototype.slice.call(list, idx, idx + len);
    idx += 1;
  }
  return acc;
}
// console.log(_aperture(4, [1,2,3,4,5,6])); // [ [ 1, 2, 3, 4 ], [ 2, 3, 4, 5 ], [ 3, 4, 5, 6 ] ]

//###########  _arrayFromIterator
// 从iterator 获取value。
function _arrayFromIterator(iter) {
  var list = [];
  var next;
  while (!(next = iter.next()).done) {
    list.push(next.value);
  }
  return list;
}
let arr = [1, 2, 3];
let obj = {
  first: {
    id: '1',
    name: 'liu'
  },
  second: {
    id: '2',
    name: 'ruoen'
  }
}
// arr is iterable, not a iterator, array cannot use next function.
// arr.next(); 

// change arr to iterator
const iter = arr[Symbol.iterator]();
// const iterObj = obj[Symbol.iterator]();

function getArrayFromIterator(iter) {
  let list = [];
  let next;
  while (!(next = iter.next()).done) {
    list.push(next.value)
  }
  return list;
}

// console.log(_arrayFromIterator(iter));
// console.log(getArrayFromIterator(iter));

var Fib = {
  [Symbol.iterator]() {
    var n1 = 1,
      n2 = 1;
    return {
      next() {
        var current = n2;
        n2 = n1;
        n1 = n1 + current;
        return {
          value: current,
          done: false
        };
      },
      return (v) {
        console.log('Done');
        return {
          value: v,
          done: true
        };
      }
    };
  }
};
// for (var v of Fib) {
//   console.log(v);
//   if (v > 50) break;
// }



// 1 1 2 3 5 8 13 21 34 55
// Done


//###### _has
function _has(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}