const arrayofRandoms = randomCeil => length =>
  Array.from({
      length: length
    }, (v, i) =>
    Math.floor(Math.random() * randomCeil));

const timeIt = (label, fn) => {
  console.time(label);
  fn();
  console.timeEnd(label);
}

const arrOfThousand = arrayofRandoms(100)(1000);
const arrOfMillion = arrayofRandoms(100)(1e6);

const isEven = val => val % 2 === 0;
const tripleIt = val => val * 3;


// timeIt('thousand - map', () => {
//  const resultFrom1000 = arrOfThousand
//   .map(tripleIt);
// })

// timeIt('thousand - map & filter', () => {
//  const resultFrom1000 = arrOfThousand
//   .map(tripleIt)
//   .filter(isEven);
// })


// timeIt('Million - map', () => {
//  const resultFrom1000 = arrOfMillion
//   .map(tripleIt);
// })

// timeIt('Million - map & filter', () => {
//  const resultFrom1000 = arrOfMillion
//   .map(tripleIt)
//   .filter(isEven);
// })

// timeIt('Million - map & imprevtive', () => {
//  const resultFrom1000 = []
//  arrOfMillion
//   .forEach(val => {
//    const res = tripleIt(val);
//    if (isEven(res)) resultFrom1000.push(res)
//   });
// })



//reducer :: acc -> value -> acc
const reducer = (accumulation, value) => {
  return accumulation + value;
}
reducer(10, 5); // 15
console.log(reducer('hello', ' paul')); // hello paul

console.log([1, 2, 3, 4, 5].reduce(reducer, 0));

const objReducer = (acc, obj) => {
  return {
    ...acc,
    ...obj
  }
}
const user = {
  name: 'Paul',
  email: 'levuon@163.com'
}

console.log(objReducer(user, {
  nickname: 'Pauly D'
}));


const setReducer = (acc, val) => {
  return acc.add(val);
}

const mySet = new Set([1, 2, 3, 4]);
console.log(setReducer(mySet, 4));