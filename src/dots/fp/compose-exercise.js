require('../../utils/support');
var _ = require('ramda');
var accounting = require('accounting');


// 示例数据
var CARS = [
    {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
    {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
    {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
    {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
    {name: "Aston Martin One-77", horsepower: 750, dollar_value:1850000, in_stock: true},
    {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false}
  ];

// 练习 1:
// ============
// 使用 _.compose() 重写下面这个函数。
var isLastInStock = function(cars) {
  var last_car = _.last(cars);
  return _.prop('in_stock', last_car);
};

console.log( isLastInStock(CARS) );
//
var isLastInStock = _.compose(_.prop('in_stock'), _.last)
console.log( isLastInStock(CARS) );



// 练习 2:
// ============
// 使用 _.compose()、_.prop() 和 _.head() 获取第一个 car 的 name
var nameOfFirstCar = undefined;
nameOfFirstCar = _.compose( _.prop('name'), _.head )
console.log(nameOfFirstCar(CARS));


// 练习 3:
// ============
// 使用帮助函数 _average 重构 averageDollarValue 使之成为一个组合
var _average = function(xs) { return reduce(add, 0, xs) / xs.length; }; // <- 无须改动
var averageDollarValue = function(cars) {
  var dollar_values = map(function(c) { return c.dollar_value; }
, cars);
  return _average(dollar_values);
};

// ANSWER
averageDollarValue = _.compose(_average, map(_.prop('dollar_value')))
console.log(averageDollarValue(CARS));


// 练习 4:
// ============
// 使用 compose 写一个 sanitizeNames() 函数,返回一个下划线连接的小写字 符串:例如:sanitizeNames(["Hello World"]) //=> ["hello_world"]。

var _underscore = replace(/\W+/g, '_'); //<-- 无须改动,并在 sanit izeNames 中使用它
var sanitizeNames = undefined;

// ANSWER
// 数组，怎么取？ 可以用map么！！！！
// sanitizeNames = _compose(_underscore,  spilt(" "))    X 错误
sanitizeNames = _.map(_.compose(_underscore, toLowerCase, _.prop('name')))
console.log(sanitizeNames(CARS));

// 彩蛋 1:
// ============
// 使用 compose 重构 availablePrices
var availablePrices = function(cars) {
  var available_cars = _.filter(_.prop('in_stock'), cars);
  return available_cars.map(function(x){
    return accounting.formatMoney(x.dollar_value);
  }).join(', ');
};
// 1: 过滤 in_stock 为true的cars, 2: 获取dollar_value， 3: formatMoney。 4: join(', ')
availablePrices = _.compose(
  join(', '),
  _.map(_.compose( accounting.formatMoney, _.prop('dollar_value'))),
  _.filter(_.prop('in_stock'))
)  ;
console.log(availablePrices(CARS));


// 彩蛋 2:
// ============
// 重构使之成为 pointfree 函数。提示:可以使用 _.flip()
var fastestCar = function(cars) {
  var sorted = _.sortBy(function(car){ return car.horsepower },
cars);
  var fastest = _.last(sorted);
  return fastest.name + ' is the fastest';
};

// 1:根据 horsepower 排序， 2: 取最后一个
// me:
fastestCar = _.compose(_.concat(' is the fastest '), _.compose(_.prop('name'), _.last, _.sortBy(_.prop('horsepower')) ))
console.log(fastestCar(CARS));


var append = _.flip(_.concat);
fastestCar = _.compose(append(' is the fastest'), _.prop('name'), _.last, _.sortBy(_.prop('horsepower')) )
console.log(fastestCar(CARS));
