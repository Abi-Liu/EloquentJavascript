## Abstraction

Abstractions hide details and allows us to talk about concepts at a higher level.

**example:**
```
let total = 0, count = 1;
while (count <= 10) {
  total += count;
  count += 1;
}
console.log(total);
```

vs

```
console.log(sum(range(1, 10)));
```

In the second one, all the functionality are abstracted into their own individual functions, making it more readable and human friendly.

Try to find work or code that you keep repeating and abstract it into its own function. This will make your code more readable as well as making it easier for you to code in the long run.

## Higher Order Functions

What if we want to write a helper function that does something "N" times. Well we can write a function with a loop inside like so:
```function doManyTimes(n){
    for(let i = 0; i< n; i++){
        console.log(i)
    }
}```
What if we wanted to do something more complex? This is where higher order functions come into play. Because functions are just values, you can pass in functions as arguments to another function.

Higher order functions can also be functions that return a function as its return value. Here are some examples of each type

```
function double(n){
    return n*2
}

function doubleArray(arr, callback){
    for(let i = 0; i < arr.length; i++){
        arr[i] = callback(i)
    }
    return arr
}
```

in this example, we have a function double which takes in a number n and returns n*2. The doubleArray function takes in an array, **as well** as a callback function. the callback function we are passing in is the double function, thus making the doubleArray function a higher-order function. It takes each element of the array and doubles the value.


Now lets take a look at a function returning a function

```
function greaterThan(n) {
  return m => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));
// → true
```

Here the variable greaterThan10 is holding the returned function: m => m > n. Because greaterThan10 is the result of the call ```greaterThan(10)```. the returned function is actually this: ```m => m > 10```. Now whenever greaterThan10 is called, it will compare its argument to 10 and return true if it is greater or false if it is not. ```greaterThan10(11) => 11 > 10 => true```

Common examples of higher order functions include the array methods: forEach, map, filter, etc.

## Array Methods

Filter: It filters out the elements in an array that don’t pass a test into a new array.
```
function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if (test(element)) {
      passed.push(element);
    }
  }
  return passed;
}

console.log(filter(SCRIPTS, script => script.living));
```

Map: The map method transforms an array by applying a function to all of its elements and building a new array from the returned values. The new array will have the same length as the input array, but its content will have been mapped to a new form by the function.

```
function map(array, transform) {
  let mapped = [];
  for (let element of array) {
    mapped.push(transform(element));
  }
  return mapped;
}

const arr = [{name: 'todd', age: 25, gender: 'm'}, {name: 'bob', age: 45, gender: 'm'}, {name: 'jill', age: 25, gender: 'f'}]

map(arr, s=>s.name)
// => ['todd', 'bob', 'jill']
```

Reduce: Another common thing to do with arrays is to compute a single value from them. The map function builds a value by repeatedly taking a single element from the array and combining it with the current value. The reduce function takes in 3 parameters unlike the other array methods. The first is the array, second is the callback function, and the third is the starting value.

```
function reduce(array, combine, start) {
  let current = start;
  for (let element of array) {
    current = combine(current, element);
  }
  return current;
}

console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// → 10
```
**Note**: In the standard reduce method, if your array contains at least one element, you are allowed to leave off the start argument. The method will take the first element of the array as its start value and start reducing at the second element.