function PathResovle(){

}

PathResovle.prototype.of = function () {
  return new PathResovle();
};
PathResovle.prototype.map = function (f) {
  return this.of(f)
}
