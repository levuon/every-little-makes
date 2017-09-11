// require('./lodash/after');
// require('../src/dots/rest');
// require('../src/dots/fp');



// const R = require('ramda');
//
// function add(x, y) {console.log(x + y)}
// const addEd = R.curry(add);
// const f = addEd(1);
// f(2);

require('../src/utils/support');
const R = require('ramda');

// let count = 0;
// function mutil(x) {
//   count++
//   return x*x
// }

// var squareNumber  = memoize(mutil);


// // 可以实现，但是不是很健壮.
// function memoize(fn) {
//   let cache = {};
//   return function() {
//      var arg_str = JSON.stringify(arguments);
//      cache[arg_str] = cache[arg_str] || fn.apply(fn, arguments);
//      return cache[arg_str];
//     //  return cache[val] ? cache[val] : (cache[val] = fn(val), cache[val])
//   }
// }

// console.log( squareNumber(4) );
// console.log( squareNumber(4) );
// console.log( squareNumber(5) );
// console.log( squareNumber(5) );
// console.log(count);

const _filter = curry((f, xs) => {
  return xs.filter(f);
});

const head = curry(function(arr){
  return arr[0];
});

const _map = curry((f, xs) => {
  return xs.map(f);
});

const pipeAsync = (...fns) => params => 
  fns.reduce((prev, cur) => !!prev.then ? prev.then(cur) : cur(prev), Promise.resolve(params))

// const pipe = (...fns) => params => 
//   fns.reduce((prev, cur) => !!prev.then ? prev.then(cur) : cur(prev), params)




const toArray = arg => Array(1).fill().map( _ => arg );

const notEmptyArray = arr => arr && arr.length > 0;
/*
 * 业务logic  
 */
// 是否已经选座
const hasSelectSeat = p => {
  return p.seatNo && p.seatNo !== ""
}

const hasPrice = p => {
  return p.seatNo && p.seatNo !== "" && 
    p.downseatextra &&
    p.downseatextra[p.seatNo] && 
    p.downseatextra[p.seatNo].price
}

const _getSeatPrice = p => p.downseatextra[p.seatNo].price;
const _getSeat = p => p.downseatextra[p.seatNo];



// const getHasPriceSeat =  pipe(
//   _filter(hasSelectSeat),
//   _filter(hasPrice),
//   _map(_getSeat)
// );

// const getPrice = pipe(
//     toArray,
//     _filter(hasSelectSeat),
//     _filter(hasPrice),
//     _map(_getSeatPrice),
//     head,
//     R.prop('price')
//   );

// // 过滤未选座乘客
// const selectedSeatInfo = pipe(_filter(hasSelectSeat));


// // const totalPrice = (...p) => p.map(getHasPriceSeat).filter(notEmptyArray).reduce((prev, cur) => prev + parseInt(cur.price), 0);
// const totalPrice = (...p) => {
//   let result = pipe(
//     // trace('getHasPriceSeat#before:\n'),
//     getHasPriceSeat
//     // trace('getHasPriceSeat#after:\n')
//     // _filter(notEmptyArray)
//   )(...p);
//   console.log("result:", result);
  
//   return result.reduce((prev, cur) => prev + parseInt(cur.price), 0);
// }






// seatNoInfo([{seatNo: '34A'}, {seatNo: undefined}]).then( res => console.log(res))
// console.log(totalPrice( [{seatNo: '34A', downseatextra: {"34A" : { price: '500' }}}, 
//                          {seatNo: undefined},
//                          {seatNo: '34L', downseatextra: {"34L" : { price: '500' }}}]));


const attachTrace = fn => {
  return [
    trace(`${fn.name}#before: \n`),
    fn,
    trace(`${fn.name}#after: \n`)
  ];
}  

const pipe = (...fns) => params => 
  fns.reduce((prev, cur) => cur(prev), params)

const logspace = x => {
  console.log('\n\r');
  return x;
}

const pipeTrace = (...fns) => params => {
  let fnList;
  if(true) {
    fnList = fns.reduce( (prev, cur) => {
      prev.push(trace(`${cur.name}#before:`));
      prev.push(cur);
      prev.push(trace(`${cur.name}#after:`));
      prev.push(logspace)
      return prev;
    }, []);
  }
  fnList.reduce((prev, cur) => cur(prev), params)
}


let aaa = pipeTrace(
  log1,
  log2
)


function log1(x) {
  console.log('1', x);
  return x;
}
function log2(x) {
  console.log('2', x);
  return x;
}

console.log(aaa('lev') || "1");
