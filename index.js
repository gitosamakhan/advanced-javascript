let person = { name: "osama" };
let objectBase = Object.getPrototypeOf(person);
let descriptor = Object.getOwnPropertyDescriptor(objectBase, "toString");
console.log(descriptor);

Object.defineProperty(person, "name", {
  writable: false,
  enumerable: true,
  configurable: false,
});

function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.draw = () => console.log("draw");

const c1 = new Circle(1);
const c2 = new Circle(2);

Circle.prototype.toString = function () {
  console.log("Circle with Radius: " + this.radius);
};
