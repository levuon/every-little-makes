function getHash(){
  console.log([].slice.call(arguments, 0));
  var result = Object.create(null);
  if(arguments.length > 0){
    extend.apply(null, [result].concat([].slice.call(arguments, 0)));
  }
  return result;
};
function hasOwn(o, k) {
  return Object.prototype.hasOwnProperty.call(o, k);
}

function extend( /*o ...*/ ) {
  var l = arguments.length,
    i = 0,
    k, o,
    target;
  while (i < l) {
    target = arguments[i];
    if (target === Object(target)) {
      break;
    }
    i++;
  }
  if (i === l) {
    return {};
  }
  i++;
  while (i < l) {
    o = arguments[i++];
    if (o !== Object(o)) {
      continue;
    }
    for (k in o) {
      if (hasOwn(o, k)) {
        target[k] = o[k];
      }
    }
  }
  return target;
}


var a = getHash();
var b = getHash({key: 'b'});
console.log(a, b);
