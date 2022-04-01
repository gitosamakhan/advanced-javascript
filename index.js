function Circle(radius) {
  this.radius = radius;
  this.draw = () => console.log("draw");
}

const circle = new Circle(2);
