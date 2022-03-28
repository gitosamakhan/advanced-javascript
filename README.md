<details>
<summary>Objects</summary>
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

There are 2 types of functions when it comes to construct objects, `Factory Fucntions` and `Constructor Functions`. In modern JS, factory functions are preferred, and it throws error if the `new` keyword is not used.

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
