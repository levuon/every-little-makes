

function Stream() {
  this.name = 'stream';
}

function Readable(){
  this.hold = 'readable'
  Stream.call(this);
}

var a = new Readable();
console.log(a);
