

function isOdd(v){
  return v % 2 == 1;
}


function not(fn){
  return function negated(...arg){
    return !fn(...arg);
  }
}

const isEven = not(isOdd);

console.log(isOdd(3));
console.log(isEven(4));

