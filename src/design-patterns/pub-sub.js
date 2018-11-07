/*
 * 发布订阅模式
 */

let nativeOwn = Object.prototype.hasOwnProperty
let nativeAlice = Array.prototype.slice

function Publisher() {
  this.handlers = {}
}

Publisher.prototype.on = function(signal, handler) {
  if(!nativeOwn.call(this.handlers, signal)) {
    this.handlers[signal] = []
  }
  this.handlers[signal].push(handler);
  return this;
}

Publisher.prototype.emit = function(signal) {
  let handlerArgs = nativeAlice.call(arguments, 1);
  let preHandlers = this.handlers[signal]
  if(preHandlers) {
    preHandlers.map(handler => handler.apply(this, handlerArgs))
  }
  return this;
}

Publisher.prototype.off = function(signal, handler) {
  let targets = this.handlers[signal]
  if(targets) {
    this.handlers[signal] = targets.filter(target => target !== handler)
  }
  return this;
}

var pub = new Publisher()

function log() {
  console.log.apply(null, arguments)
}