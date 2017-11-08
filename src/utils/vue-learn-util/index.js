
// const inBrowser = typeof window !== undefined;


// let mark 


// if(progress.env.NODE_ENV !== 'production') {
//   const perf = inBrowser && window.performance

//   if(
//     perf &&
//     perf.mark &&
//     perf.clearMarks &&
//     perf.measure &&
//     perf.clearMeasures 
//   ) {
//     mark = tag => perf.mark(tag)

//   }
// }

/**
 * mark 使用
 */

// function randomFunc (n) {
//   if (!n) {
//       // 生成一个随机数
//       n = ~~(Math.random() * 10000);
//   }
//   var nameStart = 'markStart' + n;
//   var nameEnd   = 'markEnd' + n;
//   // 函数执行前做个标记
//   window.performance.mark(nameStart);

//   for (var i = 0; i < n; i++) {
//       // do nothing
//   }

//   // 函数执行后再做个标记
//   window.performance.mark(nameEnd);

//   // 然后测量这个两个标记间的时间距离，并保存起来
//   var name = 'measureRandomFunc' + n;
//   window.performance.measure(name, nameStart, nameEnd);
// }

// // 执行三次看看
// randomFunc();
// randomFunc();
// // 指定一个名字
// randomFunc(888);
// var marks = window.performance.getEntriesByType('mark');
// console.log(marks);


let state = {
    latitude: '123', // 当前位置纬度
    longitude: '', // 当前位置经度
    cartList: {}, // 加入购物车的商品列表
    shopDetail: null, //商家详情信息
    userInfo: null, //用户信息
    shopid: null,//商铺id
    remarkText: null,//可选备注内容
    inputText: '',//输入备注内容
    invoice: false,//开发票
    newAddress: [], //确认订单页新的地址
    searchAddress: null,//搜索并选择的地址
    geohash: 'wtw3sm0q087',//地址geohash值
    choosedAddress: null,//选择地址
    addressIndex: null,//选择地址的索引值
    needValidation: null,//确认订单时是否需要验证
    cartId: null, //购物车id
    sig: null,//购物车sig
    orderParam: null,//订单的参数
    orderMessage: null, //订单返回的信息
    orderDetail: null, //订单详情
    login: true,//是否登录
    imgPath:null,//头像地址
    removeAddress:[],//移除地址
    addAddress:'',		//新增地址
    question: null,//问题详情
    cartPrice: null, //会员卡价格,
    demoCount: 0
}

console.time('prop');
for(let i = 0; i < 1000000; i ++){
  state.demoCount = i;
}
console.timeEnd('prop');

console.time('Object.assign');
for(let i = 0; i < 1000000; i ++){
  state = Object.assign({}, state, {demoCount: i})
}
console.timeEnd('Object.assign');
