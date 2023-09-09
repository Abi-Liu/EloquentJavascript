## Object Oriented Programming

 A set of techniques that use objects (and related concepts) as the central principle of program organization.


## Encapsulation

The core idea in object-oriented programming is to divide programs into smaller pieces and make each piece responsible for managing its own state.

By keeping the information local to that part of the function, engineers working on other parts of the program do not even need to know how that function works.

**Example**: An engineer working on a car engine doesn't need to know how the steering wheel works, or how the car body is made. They only need to focus on making their own functionality, the engine, work.

Because of this, the different pieces of the program only need to interact with eachother through a simplified interface, with a set of methods and attributes that provide the necessary functionality, without showing all the messy complexity hidden within the functions.

These program pieces are modeled using objects. Properties that are part of the interface are called **public** wheras others, which outside code should not be touching, are called **private**

Many languages provide ways to differentiate public and private properties, but Javascript does not. However, there is a workaround to this issue. Javascript developers often put an underscore (_) at the start of properities to indicate they are private.


## Methods

Methods are just properties that hold function values:

```
let cat = {
    name: 'sparkles',
    speak: () => console.log('meow')
}

cat.speak()
// -> 'meow'
```

In this example the `speak` property is a method.

Usually a method needs to do something with the object it was called on. When a method is called ex: cat.speak() - the binding called `this` in its body auotmatically points at the object it was called on.

Lets take the same speak function and modify it a bit to demonstrate this.

```
function speak(line){
    console.log(`The ${this.type} rabbit says '${line}'`)
}

let whiteRabbit = {type: 'white', speak}
let angryRabbit = {type: 'angry', speak}

whiteRabbit.speak('hello!') => 'The white rabbit says 'hello!'
angryRabbit.speak('AHHHH!') => 'The angry rabbit says 'AHHHH!'
```

This is essentially an extra parameter that is passed in a different way.
There is another way to call this function using the `call` method that explicitly passes in the 'this' parameter and treats arguments after as normal parameters.

```
speak.call(whiteRabbit, 'Bye') => The white rabbit says 'Bye'
```


## Prototypes

```
let empty = {};
console.log(empty.toString);
// → function toString(){…}
console.log(empty.toString());
// → [object Object]
```

How is there a property on an empty object?

The answer is through Prototypes.

Most Javascript objects have a prototype. A prototype is another object that is used as a fallback source of properties. If an object gets a request for a property it doesn't have, it searches its prototype, then its prototype's prototype, and so on.

So when does it end? It ends when it gets to the almighty prototype, `Object.prototype`. This is the entity behind almost all objects.
Nearly everything in JavaScript is built from this prototype. Everything except for the 6 primitive types, strings, numbers, boolean, symbols, null and undefined.

You can create your own prototypes

```
let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
killerRabbit.speak("SKREEEE!");
// → The killer rabbit says 'SKREEEE!'
```

the protorabbit object acts as a prototype for the properties that are shared by all rabbits. An individual rabbit object, like killer rabbit, contains properties that apply only to itself and derives shared properties from its prototype.


## Classes

This prototypal system that Javascript provides can be interpreted as a take on classes in other object-oriented languages. A class defines the shape of a type of object -- what methods and properties it has. An object created from the class is called an instance of the class.

Prototypes, like classes, are useful for defining properties for which all instances of a class share the same value, such as methods. Properties that differ per instance, like the rabbits' type property, need to be stored directly in the objects themselves.

So, to create a proper instance of a given class, you first make sure an object derives from the correct prototype, and then you have to make sure that it has the individual properties it's supposed to have.

This is what a `constructor` function does.

```
function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit);
  rabbit.type = type;
  return rabbit;
}
```

JavaScript provides a way to make defining this type of function easier. If you put the keyword new in front of a function call, the function is treated as a constructor. This means that an object with the right prototype is automatically created, bound to this in the function, and returned at the end of the function.

This is another way to create the same constructor function:

```
function Rabbit(type) {
  this.type = type;
}
Rabbit.prototype.speak = function(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};

let weirdRabbit = new Rabbit("weird");
```

This is equivalent to the previous version, but much more convenient. 

By convention, the names of constructors are capitalized so that they can easily be distinguished from other functions.


## Class Notation

Classes are constructor functions with a prototype property and up until 2015, that was how they were written. However with the release of ES6, we got a less awkward way of writing them.

```
class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}

let killerRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black");
```

The class keyword starts a class declaration, which allows us to define a constructor and a set of methods all in a single place.

The one named `constructor` is treated specially. It provides the actual constructor function, which will be bound to the name Rabbit. The other methods are packaged into that constructor's prototype.

Both this and the previous constructor definition are the same, this just adds a bit of syntactic sugar to make it look nicer.

Currently, class declarations only allow methods to be added to the prototype.

## Overriding derived properties

When adding a new property to an object, regardless of if it is present in the prototype, the property is added to the individual object. This effectively gets rid of the property within the objects prototype as it is now hidden behind the objects own property.

```
Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
// → small
killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);
// → long, sharp, and bloody
console.log(blackRabbit.teeth);
// → small
console.log(Rabbit.prototype.teeth);
// → small
```

Overriding properties that exist in a prototype can be a useful thing to do. As the rabbit teeth example shows, overriding can be used to express exceptional properties in instances of a more generic class of objects, while letting the nonexceptional objects take a standard value from their prototype.

## Maps

Not to be confused with the array method `map`. This map is a data structure that associate key value pairs. Similar to an object.

```
let ages = {
    Boris: 39,
    Liang: 22,
    Julia: 62
}
```

However, rather than using a plain object for a map, Javascript comes with a class called Map. It stores a mapping and allows any type of keys.

```
let ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Júlia", 62);
```

The main methods of the map class are `set`, `get`, `delete`, and `has`

If you do have a plain object that you need to treat as a map for some reason, it is useful to know that Object.keys returns only an object’s own keys, not those in the prototype. As an alternative to the in operator, you can use the hasOwnProperty method, which ignores the object’s prototype.


## Polymorphism

```
Rabbit.prototype.toString = function() {
  return `a ${this.type} rabbit`;
};

console.log(String(blackRabbit));
// → a black rabbit
```

This is a simple instance of a powerful idea. When a piece of code is written to work with objects that have a certain interface—in this case, a toString method—any kind of object that happens to support this interface can be plugged into the code, and it will just work.

This is called `polymorphism`. It can work with values of different shapes,e as long as they support the interface it expects.

For example, the for/of loop can loop over several different kinds of data structures. This is a case of polymorphism. The loop expect the data structure to expose a specific interface. We can also add this interface to our own objects.

But first, we need to take a look at symbols

## Symbols

Property names are usually strings, but they can also be Symbols. Symbols are values created with the Symbol function. Unlike strings, newly created symbols are unique. You cannot create the same symbol twice.

```
let sym = Symbol("name");
console.log(sym == Symbol("name"));
// → false
Rabbit.prototype[sym] = 55;
console.log(blackRabbit[sym]);
// → 55
```

Being both unique and usable as property names makes symbols suitable for defining interfaces that can peacefully live alongside other properties, no matter what their names are.


## Iterator Interface

The object given to a for/of loop is expected to be iterable. This means it has a method named with the Symbol.iterator symbol (a symbol value defined by the language, stored as a property of the Symbol function).

When this method is called, it should return another object that provides an `iterator`. This is what actually iterates. It has a `next` method, that returns the next result. The result should be another object with a value property that proviedes the next value, and a done property which is true if there are no more results and false otherwise.

```
let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
// → {value: "O", done: false}
console.log(okIterator.next());
// → {value: "K", done: false}
console.log(okIterator.next());
// → {value: undefined, done: true}
```

## Getters, Setters, and Statics

Interfaces often consist mostly of methods, but it is also okay to include properties that hold non-function values. For example, the .length property for arrays and strings.

Some properties that are accessed directly may even hide a method call, these methods are called `getters` and are defined by writing get infront of the method name.

let varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  }
};

console.log(varyingSize.size);
// → 73
console.log(varyingSize.size);
// → 49

You can do a similar thing when a property is written to using `setters`

```
class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }

  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

let temp = new Temperature(22);
console.log(temp.fahrenheit);
// → 71.6
temp.fahrenheit = 86;
console.log(temp.celsius);
// → 30
```

Inside a class declaration, methods that have static written before them are stored on the constructor. So the Temperature class allows you to write Temperature.fromFahrenheit(100) to create a temperature using degrees Fahrenheit.


## Inheritance

Javascripts prototype system makes it possible to create a new class from an existing class, but with new definitions for some of its properties.

The prototype for the new class derives from the old prototype but adds a new definition for any of the methods or properties.

You can use Inheritance with the extend keyword and super keyword

```
class Animal {
  constructor(name, color){
    this.color = color
    this.name = size
  }
  speak(){
    console.log(`${this.name} makes a sound`)
  }
}

class Cat extends Animal {
  constructor (name, color, breed){
    super(name, color) // calls constructor of parent class (Animal)
    this.breed = breed
  }
  //override the speak method
  speak(){
    console.log(`${this.name} meows`)
  }

  // custom method for cats
  pur(){
    console.log(`${this.name} purrs`)
  }
}
```

Inheritance allows us to build slightly different data types from existing data types with relatively little work. It is a fundamental part of the object-oriented tradition, alongside encapsulation and polymorphism.

However, encapsulation and polymorphism can be used to separate pieces of code from each other, inheritance ties classes together, creating more tangledness. It shouldn't be the first toll you reach for in OOP

## Instance Of Operator

It can be useful to know whether an object was derived from a specific class. For this, JavaScript provides a binary operator called instanceof.

```
console.log(
  new SymmetricMatrix(2) instanceof SymmetricMatrix);
// → true
console.log(new SymmetricMatrix(2) instanceof Matrix);
// → true
console.log(new Matrix(2, 2) instanceof SymmetricMatrix);
// → false
console.log([1] instanceof Array);
// → true
```