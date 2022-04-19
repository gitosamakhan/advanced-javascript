<h1 align="center">Advanced Javascript 👾 </h1>

Notes on advanced javascript. Prototypes, Prototypical Inheritence, ES6 Classses and Tooling. Curriculum is shown below. Click on the topic to expand notes. Happy Learning 🤓

<details>
<summary>Objects</summary>

<h2 align="center">Objects</h2>

Collection of `key-value` pairs.

### Object Literals

Best practice is to use `let` or `const`, dont use `var`. `var` has issues with scoping

        const circle = {
            radius: 1,
            location: {
                x: 1,
                y: 1,
            },
            draw: function () {
                console.log("draw");
            },
        };

This is called `object-literal` syntax. From the above object literal, we can say that **draw** is a **method** and **radius** and **location** are **properties**.

There are 2 types of functions when it comes to construct objects, `Factory Fucntions` and `Constructor Functions`. In modern JS, Constructor functions are preferred, and it throws error if the `new` keyword is not used.

### Factories / Factory Functions

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

### Constructor / Constructor Functions

        // Constructor Function
        function Circle(radius) {
            console.log("this: ", this);
            this.radius = radius;
            this.draw = function () {
                console.log("draw");
            };
        }
        const anotherCircle = new Circle(1);

### Value Types vs Reference Types

It is important to understand how primitives and objects behave differently.

| Value Types (primitives) | Reference Types (objects) |
| ------------------------ | ------------------------- |
| Number                   | Objects                   |
| String                   | Functions                 |
| Boolean                  | Arrays                    |
| Symbol                   |
| undefined                |
| null                     |

Example:

        let x = 10;
        let y = x;

        x = 20; // here y = 10, not 20

On the other hand:

        let x = {value: 10}
        let y = x;

        x.value = 20; // here y = {value: 20}

similarly:

        let number = 10;

        function increment(number) {
            number++;
        }

        increment(number);
        console.log(number); // 10, because number inside the method is destroyed when its scope ends

and

        let number = {value: 10};

        function increment(number) {
            number.value++;
        }

        increment(number);
        console.log(number); // {value: 11}

### Adding properties to object literal

        function Circle(radius) {
            console.log("this: ", this);
            this.radius = radius;
            this.draw = function () {
                console.log("draw");
            };
        }
        const circle = new Circle(1);
        circle.location = { x: 1 };

        // OR

        const propertyName = "location2";
        circle[propertyName] = { y: 2 };

### Removing properties from object literal

        delete circle.location;

        // OR

        delete circle.["location"];

### Iterating / Enumerating through an object-literal

        for (let key in circle) {
            console.log(ket, circle.key);
        }

Just iterate through properties:

        for (let key in circle) {
            if (typeof circle[key] !== "function") {
                console.log(ket, circle.key);
            }
        }

If you want to get keys of an object:

        const keys = Object.keys(circle);

Conditioning:

        if ("radius" in circle) {
            // do something
        }

### Abstraction

Access modifiers (private, public etc) are not in JS, so instead, to make a key-value pair hidden or inaccessible from outside, just use `let` instead of using `this.something` in object constructor method to create the property.

        Circle(radius) {
            this.radius = radius;
            this.location = {x: 1, y: 2};
            let advancedLocation = {x: 2}
            let calculateLocation() {
                advancedLocation.........some op
            }
        }

the above literal will only have `radius` and `location` to access from outside.

### Getters and Setters

To define a getter and setter for a property, use the following code inside object constructor function:

        function Circle(radius) {
            let location = { x: 1, y: 2 }; // private property
            this.radius = radius;
            this.draw = function () {
                console.log("draw");
            };
            Object.defineProperty(this, "location", {
                get: function () {
                    return location;
                },
                set: function (newLocation) {
                    // any logic, validation
                    location = newLocation;
                },
            });
        }

Now you can get the property using;

        const location = circle.location

Or set using:

        circle.location = {x: 2}

<hr/>

</details>

<details>
<summary>Prototypes</summary>

<h2 align="center">Prototypes</h2>

`When working with inheritence, best practice is not to use arrow functions, use function keyword instead`

### Inheritence (is a)

Lets say there is an object circle with a method calculateLocation(), we also have another object named square and it also has the same method calculateLocation(). Now we dont want to implement this in both objects, rather we can create a Super class named Shape and child classes will be circle and square. Shape will contain the method and it child classes will implement that method.

### Prototypical Inheritence

When ever you hear `prototype`, **it means parent object in JS**. There are no classes in JS, so to understand and implement the above inheritence problem, we will use objects. Every object that we create in JS has an ultimate parent/prototype, just like in Java every field has an ultimate parent called object. to understand this, goto console of chrome and type:

    let x = {value: 3}; // enter

and then:

    x // type x and enter

This will display a **proto** property, which will show the parent/prototype object.

To get the prototype of a specific object, we use

    Object.getPrototypeOf(objectName);

when you try to access a method/property in an object, like `circle.toString()`, first it finds it in object itself, if not found, it finds it in its `prototype` object, if not found it finds it in the ultimate prototype/parent.

### Multilevel Inheritence

If we create an array, it will also have its ultimate parent/proptotype called `ArrayBase`, and the relationship is same of that an object. This ArrayBase is also derived from `ObjectBase` which is the ultimate prototype of each and every object in JS.

                                _____________________
                                |                   |
                        _______>|   Object Base     |
                        |       |---------------^---|
                        |                       |
                    _____________________       |
                    |                   |       |
            _______>|   Array Base      |       |
            |       |-------------------|       |
            |                                   |
        _____________________           _________________
        |                   |           |               |
        |   Array           |           |   Object      |
        |-------------------|           |---------------|

The Constructor Function is actually a prototype, when we create an abject using `Constructor Function`, we are actually creating a prototype.

    function Circle(radius) {
    this.radius = radius;
    this.draw = () => console.log("draw");
    }

    const myCircle = new Circle(2);

We are creating something like this from the above code:

                                _____________________
                                |                   |
                        _______>|   Object Base     |
                        |       |-------------------|
                        |
                    _____________________
                    |                   |
            _______>|   Circle          |
            |       |-------------------|
            |
        _____________________
        |                   |
        |   myCircle        |
        |-------------------|

If we use that Circle Constructor method again to create more objects, Circle will be the prototype of all these objects.

### Property Descriptors

Property descriptor is information about the property of an object, that it can be overriden, change, enumurated etc. Lets assume the code below where we are checking the property descriptor of `toString` method of the ultimate parent `ObjectBase`:

    let person = { name: "osama" };
    let objectBase = Object.getPrototypeOf(person);
    let descriptor = Object.getOwnPropertyDescriptor(objectBase, "toString");
    console.log(descriptor);

Running this code will give us the below result in console:

    configurable: true          // we can delete this member
    enumerable: false           // this method is not visible for keys/values of object.
    value: ƒ toString()
    writable: true              // you can override this, change value
    [[Prototype]]: Object
    (index):40 Live reload enabled.

We can also set property descriptors for our own objects properties. See the following code below:

    let person = { name: "osama" };

    Object.defineProperty(person, "name", {
        writable: false,            // name property can be changes, its value can be changed
        enumerable: true,           // if we enumerate keys, we will see "name" key
        configurable: false,        // we can not delete this property "name".
    });

### Constructor Prototypes

Constructors to create objects are also methods, and they also have prototypes because they are also object, remember, methods, arrays and objects are objects.

So if we use `Circle` constructor to create `myCircle` object. the prototype of `Circle Constructor` and `myCircle` object will be the same.

When we create an array like `let array = []`, here `= []` means `new Array()`, and the same goes for objects when we use `= {}`. Objects, Arrays and methods, they have there own prototype(set of methods and fields), and there ultimate prototype is `objectBase`.

### Prototype vs Instance Methods

Consider the code below:

    function Circle(radius) {
        this.radius = radius;
        this.draw = () => console.log("draw");
    }
    const c1 = new Circle(1);
    const c2 = new Circle(2);

In the code above, lets consider we have a lot of circles in memory, its not good to have the same method draw in each object, so we can add this method in `CircleBase`.

    function Circle(radius) {
        this.radius = radius;                                   // instance members
    }

    Circle.prototype.draw = () => console.log("draw");          // prototype members

    const c1 = new Circle(1);
    const c2 = new Circle(2);

    Circle.prototype.toString = function () {
        console.log("Circle with Radius: " + this.radius);
    };

As we know that if we call an object in JS, it looks for it in the object and if not found, JS finds it in prototype object. According to that, we can add a method in our CircleBase. The above code also shows `instance members` and `prototype members`. You can also override the CircleBase Prototype members accordingly.

Another Important thing to note is that you can call instance members in prototypical members and the other way arount.

### Iterating Instance and Prototype members

In the JS world, the members that are the part of object are called own members or own property. The word own is being used for them, and the other are called prototype members. `c1.hasOwnProperty("propertyName")` is one of the methods that returns a boolean if the key exists in the object. See the following code on how to interate through own and prototype members:

    // Returns Instance members (OwnMembers)
    console.log(Object.keys(c1));

    // Returns all members (instance/own + prototype mambers)
    for (let key in c1) console.log(key);

### Avoid extending the Built-in Objects

We should not modify to the build in objects just like this:

    Array.prototype.doSomething = function() {
        // .. do something
    }

    const array = [];
    array.doSomething();

We can modify the base prototype but not the ultimate prototype. Only extend the prototypes that we created ourself from constructor methods.

<hr/>

</details>

<details>
<summary>Prototypical Inheritence</summary>

<h1 align="center">Prototypical Inheritence</h1>

## Create your own Prototypical Inheritence

Lets create a situation where inheritence is required:
Lets say there is a circle object shown below:

    function Circle(radius) {
        this.radius = radius;
    }

    Circle.prototype.draw = function () {
        console.log("draw");
    };

    Circle.prototype.duplicate = function () {
        console.log("duplicate");
    };

    const c = new Circle(1);

From the above code, we can build a relationship like this:

                                _____________________
                                |                   |
                        _______>|   Object Base     |
                        |       |-------------------|
                        |
                    _____________________
                    |                   |
            _______>|   CircleBase      |
            |       |-------------------|
            |
        _____________________
        |                   |
        |   c               |
        |-------------------|

Now what if we needed a shape called square, now square would probably have the same draw and duplicate method. For this we need to create a `Shape` object and implement those methods in Shape, and inherit all the objects from Shape.

    function Shape() {}

    function Circle(radius) {
        this.radius = radius;
    }

    Shape.prototype.duplicate = function () {
        console.log("duplicate");
    };

    Circle.prototype = Object.create(Shape.prototype);

    Circle.prototype.draw = function () {
        console.log("draw");
    };

    const c = new Circle(1);
    c.duplicate();

Now we updated out relationship to this:

                                _____________________           _____________________
                                |                   |           |                   |
                        _______>|   ShapeBase       |---------->|   ObjectBase      |
                        |       |-------------------|           |___________________|
                        |
                    _____________________
                    |                   |
            _______>|   CircleBase      |
            |       |-------------------|
            |
        _____________________
        |                   |
        |   c               |
        |-------------------|

Heirarchy in console looks like this:

    Circle {radius: 1}
        radius: 1
        [[Prototype]]: Shape                        -----> Dont get confused by this shape ( this is crcile base actually)
            draw: ƒ ()
            [[Prototype]]: Object
                duplicate: ƒ ()
                constructor: ƒ Shape()
                [[Prototype]]: Object               -----> ObjectBase

In theory whats happening here is we are setting the CircleBase with an object of Shape.

## Resetting the constructor

Whenever we are resetting the Prototype we should also reset the constructor to avoid bugs and it also helps in future situations. The code in previous topic is updated to this:

    function Shape() {}

    function Circle(radius) {
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

    const c = new Circle(1);
    c.duplicate();

## Calling the Super Constructor

lets say we want to introduce a new property inside the shape constructor. But by default it will not show up in the object after running the code. The reason for that is shape is not being created using the `new` keyword, so `this` would not point to shape, it would point to the global object. The way to do it is this:

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

<hr/>

</details>

<details>
<summary>ES6 Classes</summary>

<h2 align="center">ES6 Classes</h2>

</details>

<details>
<summary>ES6 Tooling</summary>

<h2 align="center">ES6 Tooling</h2>

</details>
