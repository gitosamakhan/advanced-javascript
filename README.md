<h1 align="center">Advanced Javascript</h1>

<details>
<summary>Objects</summary>

## Objects

<hr/>
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

### Adding properties

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

### Removing properties

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
<summary>Prototype</summary>

## Prototype

<hr/>

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

<hr/>
</details>
