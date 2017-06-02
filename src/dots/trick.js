
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


