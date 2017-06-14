// function add( a, b ) {
//   return a + b;
// }



function add() {
  var numbers = Array.prototype.slice.call(arguments, 1);
  console.log(numbers)
  return numbers.reduce( ( accNum, current ) => accNum + current, 0 )
}

console.log(add(2,3,4,5));
