// Factory Function
function createCircle(radius) {
  return {
    radius: radius,
    draw: function () {
      console.log("draw");
    },
  };
}
const newCircle = createCircle(1);

function Circle(radius) {
  let location = { x: 1, y: 2 };
  this.radius = radius;
  this.draw = function () {
    console.log("draw");
  };
  Object.defineProperty(this, "location", {
    get: function () {
      return location;
    },
    set: function (newLocation) {
      location = newLocation;
    },
  });
}
const circle = new Circle(1);

circle.location = { x: 1 };

// OR

const propertyName = "location2";
circle[propertyName] = { y: 2 };

// Removing properties

for (let key in circle) {
  if (typeof circle[key] !== "function") {
    console.log(ket, circle.key);
  }
}
