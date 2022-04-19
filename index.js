function Shape(color) {
  this.color = color;
}

function Circle(radius, color) {
  Shape.call(this, color);
  this.radius = radius;
}

Shape.prototype.duplicate = function () {
  console.log("duplicate");
};

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.draw = function () {
  console.log("draw");
};

const c = new Circle(1, "red");
c.duplicate();
