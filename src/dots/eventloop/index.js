// function first() {
//   console.log('first');
// }
// function second() {
//   console.log('second');
// }
// function third() {
//   console.log('third');
// }
// first();
// setTimeout(second, 1000); // Invoke `second` after 1000ms
// third();

console.log('Hi');  
setTimeout(function cb1() { 
    console.log('cb1');
}, 5000);  
console.log('Bye');