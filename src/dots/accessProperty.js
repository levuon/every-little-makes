

// bluebird  utils.js
function toFastProperty( obj ) {
    let FakeConstructor = function(){};
    FakeConstructor.prototype = obj;
    let i = 8;
    while(i--)
        new FakeConstructor();
    return obj;
}
