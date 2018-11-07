
function assert(condition, msg, error) {
  if (!condition) {
    if (msg instanceof Error) {
      throw msg;
    } else if (arguments.length > 2) {
      throw new error(msg);
    } else {
      throw new Error(msg);
    }
  }
}

const keyProxy = new Proxy({}, {
  get(_target, propKey, _receiver) {
    return propKey;
  }
});
const {foo, bar, baz} = keyProxy;

assert.equal(foo, 'foo');
assert.equal(bar, 'bar');
assert.equal(baz, 'baz');
