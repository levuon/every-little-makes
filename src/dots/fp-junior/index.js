

// functional programming
/*
return mapWith(maybe(getWith('name'))(customerList);
*/

// command style
/*
return customerList.map( customer => {
  if(customer) return customer.name;
});
*/


(function() {
  return (function () {
    console.log(true);
  });
})()(); // true


(function (Pi) {
  return function (diameter) {
    console.log(diameter * Pi);
  }
})(3.14159265)(2);



(function (diameter) {
  var Pi = 3.14159265;
  console.log(diameter * Pi);
})(2);

// ====>
// nice code
// The underscore what we said: if you have an expression that evaluates to a function
// you apply it with(). a name that's bound to a function is a valid expression
// evaluates to a function.
(function (diameter) {
  var cal = function (diameter) {
    var Pi = 3.14159265;
    return diameter * Pi;
  }
  console.log('The diameter is ' + cal(diameter));
})(2);


// high order function

const repeatFn = function(num, fn) {
  let value;

  for(let i = 0; i < num; i ++) {
    value = fn(i)
  };
  return value;
}


repeatFn(3, function (result) {
  console.log('yeah');
})
