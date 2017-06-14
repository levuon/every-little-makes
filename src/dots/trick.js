
//*************************************** rate star
var star = '★★★★★☆☆☆☆☆';

var rate = 1;  //"★☆☆☆☆"
console.log( star.slice( 5 - rate, 10 - rate ) );
rate = 2;      // "★★☆☆☆"
console.log( star.slice( 5 - rate, 10 - rate ) );
rate = 3;      // "★★★☆☆"
console.log( star.slice( 5 - rate, 10 - rate ) );
rate = 4;      // "★★★★☆"
console.log( star.slice( 5 - rate, 10 - rate ) );
rate = 5;      // "★★★★★"
console.log( star.slice( 5 - rate, 10 - rate ) );


//*************************************** 函数一等公民
// BAD:
const getServerStuff ＝ function(callback){
    return ajaxCall(function(json){
      callback(json)
    })
};
// 等价于：
// GOOD:
const getServerStuff = ajaxCall
