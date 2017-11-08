const curry = require('../../src/utils/curry');

// ######## freeze #########
var a = {
  profile: {
    name: 'liuhuan',
    age: '29',
    gender: 'male'
  },
  knowleage: 'colleage'
}

function isFreezable(object) {
  if (object === null) return false
  if (object instanceof RegExp) return false

  return Array.isArray(object) || typeof object === 'object'
}

function needsFreezing(object) {
  return isFreezable(object) && !Object.isFrozen(object)
}

function loopFreeze(obj) {
  Object.freeze(obj);

  Object.keys(obj).map( key => {
    let val = obj[key];
    if(needsFreezing(val)){
      loopFreeze(val);
    }
  });
  return obj;
}

function freeze(obj) {
  if(needsFreezing(obj)) {
    loopFreeze(obj)
  }
  return obj;
}

// freeze(a);
// a.profile.marray = 'married';

// console.log(a);

function constant(value) {
  const frozen = freeze(value);
  return () => frozen
}

// ####### end freeze


var alwaysFour = constant({
  aa: '1',
  bb: '2'
});
// console.log(alwaysFour(32));



function wrap(func, length = func.length) {
  return curry((...args) => freeze(func(...args)), length)
}

function show(arg, val) {
  console.log(arg, val);
}

var aa = wrap(show);
a.profile.marray = 'married';
let cc = aa('1232');

cc('hahah');