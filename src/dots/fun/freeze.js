function freeze(obj) {
  if(needFreezing(obj)) {
   loopFreeze(obj);
  }
  return obj;
}

function needFreezing(obj) {
  return isFreezable(obj) && !Object.isFrozen(obj);
}

function isFreezable(obj) {
 if(obj === null) return false;
 if(obj instanceof RegExp) return false;
 return Array.isArray(obj) || typeof obj === 'object'
}

function loopFreeze(obj) {
  Object.freeze(obj);

  Object.keys(obj).map( key => {
    let val = obj[key];
    if(needFreezing(val)) {
     loopFreeze(obj);
    }
  })
  return obj;
}

function constant(obj) {
 const frozen = freeze(obj);
 return () => frozen;
}

module.exports = constant


