//*******************************************1: repeat 字符串次数
//利用join有多少个对象就插入 n - 1 个target
	/**
	 * [].length   //0
	 * [,].length  //1
	 * [,,].length //2
	 */
	[ "1", "2" ].join( "aa" ); // 1aa2
[ , , ].join( "aa" );   // aa

//v1: 创造了一个数组,增加了性能
function repeatV1( target, n ) {
	return (new Array( n + 1 )).join( target );
}
//v2: 传一个类数组进去, 有length属性.
function repeatV2( target, n ) {
	return Array.prototype.join.call( { length: n + 1 }, target )
}
//v3: 利用闭包将类数组对象和数组原型的join方法缓存起来, 省的每次都重复创建与寻找方法
var repeatV3 = (function () {
	var join = Array.prototype.join, obj = {};
	return function ( target, n ) {
		obj.length = n + 1;
		return join.call( obj, target );
	}
})();
//v4: 从算法入手.
function repeatV4( target, n ) {
	var s = target, total = [];
	while ( n > 0 ) {
		if ( n % 2 == 1 ) {
			total[ total.length ] = s; //若是奇数
		}
		if ( n == 1 ) {
			break;
		}
		s += s;
		n = n >> 1; // 将n除以2 取其商, 或者开2 二次方
	}
	return total.join( '' );
}
//v5: 免去创造数组和join 方法
function repeatV5( target, n ) {
	var s = target, c = s.length * n;
	do {
		s += s;
	} while ( n = n >> 1 )

	s = s.substring( 0, c );
	return s;
}
//v6: 版本4的改良方法   各个浏览器得分最高.
function repeatV6( target, n ) {
	var s = target, total = "";
	while ( n > 0 ) {
		if ( n % 2 == 1 ) {
			total += s;
		}
		if ( n == 1 ) {
			break;
		}
		s += s;
		n = n >> 1; // 将n除以2 取其商, 或者开2 二次方
	}
	return total;
}
//v7: 与版本6接近
function repeatV7( target, n ) {
	if( n ==1 ) {
		return target;
	}
	var s = repeatV7(target, Math.floor( n / 2 ));
	s += s;
	if( n % 2) {
		s += target;
	}
	return s;
}
//v8: 是个反例
function repeatV8( target, n ) {
	return ( n <= 0 ) ? "" : target.concat(repeatV8( target, --n ))
}

global['repeatV1'] = repeatV1;
global['repeatV2'] = repeatV2;
global['repeatV3'] = repeatV3;
global['repeatV4'] = repeatV4;
global['repeatV5'] = repeatV5;
global['repeatV6'] = repeatV6;
global['repeatV7'] = repeatV7;
global['repeatV8'] = repeatV8;


for( let i = 1; i <= 8; i++ ){
    console.time(`repeatV${i}`)
    global[`repeatV${i}`]('levuon', 10000)
    console.timeEnd(`repeatV${i}`)
}

// repeatV1: 0.142ms
// repeatV2: 0.075ms
// repeatV3: 0.084ms
// repeatV4: 0.075ms
// repeatV5: 0.130ms
// repeatV6: 0.051ms
// repeatV7: 0.043ms
// repeatV8: 0.113ms

// repeatV1: 0.621ms
// repeatV2: 1.460ms
// repeatV3: 0.406ms
// repeatV4: 0.114ms
// repeatV5: 0.137ms
// repeatV6: 0.056ms
// repeatV7: 0.061ms
// repeatV8: 1.982ms