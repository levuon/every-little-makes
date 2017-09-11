function EmmitEventer(){
  return EmmitEventer.init.call(this);
}

EmmitEventer.domain = false

EmmitEventer.init = function() {
  this.domain = domain;
  this.name = this.name || 'haha'
}

var a = new EmmitEventer('a');
var b = new EmmitEventer();
console.log('a', a);
console.log('b', b);

