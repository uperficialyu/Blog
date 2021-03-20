function A() {
  this.x = 100;
}
A.prototype.getX = function getX() {
  console.log(this.x);
};

function B() {
  //CALL继承
  A.call(this);  //=>this.x = 100;  b.x=100;
  this.y = 200;
}
B.prototype.getY = function getY() {
  console.log(this.y);
};
let b = new B;
console.log(b);