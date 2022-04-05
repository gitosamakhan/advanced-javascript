let person = { name: "osama" };
let objectBase = Object.getPrototypeOf(person);
let descriptor = Object.getOwnPropertyDescriptor(objectBase, "toString");
console.log(descr);

Object.defineProperty(person, "name", {
  writable: false,
  enumerable: true,
  configurable: false,
});
