
// ################## rate star ##################
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


// ################## 函数一等公民 ##################
// BAD:
const getServerStuff ＝ function(callback){
    return ajaxCall(function(json){
      callback(json)
    })
};
// 等价于：
// GOOD:
const getServerStuff = ajaxCall


// ################## 快速访问对象属性 ##################
// bluebird  utils.js
function toFastProperty( obj ) {
    let FakeConstructor = function(){};
    FakeConstructor.prototype = obj;
    let i = 8;
    while(i--)
        new FakeConstructor();
    return obj;
}

//***************************************2: 字符串 空格转换为数组.
var rnotwhite = (/\S+/g);
var arr = "aa bb cc".match( rnotwhite ); // ["aa", "bb", "cc"];

//*************************************** 7 检测质数

function isPrime( n ) {
	return !(/^.?$|^(..+?)\1+$/).test( '1'.repeat( n ) )
}


//*************************************** 8: 将多维数组 破开成为一维数组
var foo0 = [ 1, [ 2, 3 ], [ 4, 5, [ 6, 7, [ 8 ] ] ], [ 9 ], 10 ];

var foo1 = foo0.join( ',' ).split( ',' );

console.log( foo1 ); //["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

//*************************************** 9: 统计字符串相同数字出现的次数
var arr = 'abcdaabc';

var info = arr
	.split( '' )
	.reduce( ( p, k ) => (p[ k ]++ || (p[ k ] = 1), p), {} );

console.log( info ); //{ a: 3, b: 2, c: 2, d: 1 }

//*************************************** 10: 随机颜色值.
Math.floor( Math.random() * (2 << 23) ).toString( 16 );

//*************************************** 11: 驼峰变小写通过_ 链接

"comeHereToKnow".match( /^[a-z][a-z0-9]+|[A-Z][a-z0-9]*/g ).join( '_' ).toLowerCase();  //  come_here_to_know

//*************************************** 12: 复制 附带 信息
/**
 * 前端写代码会检测一些变量判断浏览器是否有响应特性,然后做降级处理.尝试通过剪贴板赋值功能附带版权信息时,
 * 知乎的js会判断getSelection.所以我们可以在知乎的js脚本执行之前运行这行代码,
 * 假装自己是垃圾浏览器,从而不会被加入版权信息sa.
 */

var concatPre = Array.prototype.concat;
Array.prototype.concat = function ( arg1 ) {
	function checkExtra( arr ) {
		return arr && arr.slice && arr[ 3 ] === "著作权归作者所有，转载请联系作者获得授权。";
	}

	if ( checkExtra( this ) || checkExtra( arg1 ) ) {
		return [];
	} else {
		return concatPre.apply( this, arguments );
	}
};

var tipStyle = "color: white;font-size: 22px;display: inline-block;position: absolute;top: 0;bottom: 0;line-height: 22px;margin: auto;height: 22px;";
$( ".zu-top" ).append( $( "<span style='" + tipStyle + "left: 10px;" + "'>" + decodeURI( "%E6%B0%91%E4%B8%BB" ) + "</span>" ) ).append( $( "<span style='" + tipStyle + "right: 10px;" + "'>" + decodeURI( "%E8%87%AA%E7%94%B1" ) + "</span>" ) );


//***************************************将99999999999 转换 999,999,999
方法一:
	function commafy( num ) {
		return num && num
			.toString()
			.replace( /(\d{1,3})(?=(\d{3})+)/g, function ( $s1, $s2 ) {
				"use strict";
				return $s2 + ','
			} )
	}

方法二:
	'9999999999'.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,');

// E4512312221231294922 ==> E45****22
'E4512312221231294922'.replace(/^(.{3}).+(?=(.{2})$)/g, '$1****');


//*************************************** URL 的参数解析

方法一:
	function methodV1( url, key ) {
		"use strict";
		var param_expr = new RegExp( '(?:^|&|\\?)' + key + '=([^&]*)(?:&|$|#)' );
		var matches = param_expr.exec( url );
		return matches ? decodeURIComponent( matches[ 1 ] ) : '';

	}

方法二:
	function methodV2() {
		"use strict";
		var obj = {};
		var url = window.location.href;
		url = url.substr( url.indexOf( '?' ) + 1 );

		url.replace( /([^&=]+)=([^&=]*)/gi, function ( rs, $1, $2 ) {
			obj[ $1 ] = $2;
		} );

		return obj
	}
	methodV2();

//*************************************** 统计字符串中字母个数或统计最多字母数。
var str = "aaaabbbccccddfgh";

var calObj = str.split("").reduce(( prev, next) => {
	"use strict";

	prev[next]++ || (prev[next] = 1);

	if( prev.max[ 'num' ] < prev[next] ){
		if( prev.max[ 'key' ] != next ) prev.max[ 'key' ] = next;
		prev.max[ 'num' ] =  prev[next];
	}
	return prev;
}, { max: { key: "", num: 0 } } );



"absajeqihweajknsekjhase".split("").reduce( (p, n) => ( p[n]++ || (p[n] = 1), p), {})

//***************************************验证邮箱


"ahhsaj.asdas@dasd.com.cn".match(/(^\w+)(\.(\w+))*@(\w+)(\.(\w+))/g)

//*************************************** 手动大写转小写，小写转大写
var manualLowercase = function(s) {
  /* jshint bitwise: false */
  return isString(s)
   ? s.replace(/[A-Z]/g, function(ch) {return String.fromCharCode(ch.charCodeAt(0) | 32);})
   : s;
};
var manualUppercase = function(s) {
  /* jshint bitwise: false */
  return isString(s)
   ? s.replace(/[a-z]/g, function(ch) {return String.fromCharCode(ch.charCodeAt(0) & ~32);})
   : s;
};
