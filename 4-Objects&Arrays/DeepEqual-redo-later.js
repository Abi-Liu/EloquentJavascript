// The == operator compares objects by identity. But sometimes you’d prefer to compare the values of their actual properties.

// Write a function deepEqual that takes two values and returns true only if they are the same value or are objects with the same properties, where the values of the properties are equal when compared with a recursive call to deepEqual.

// To find out whether values should be compared directly (use the === operator for that) or have their properties compared, you can use the typeof operator. If it produces "object" for both values, you should do a deep comparison. But you have to take one silly exception into account: because of a historical accident, typeof null also produces "object".

// The Object.keys function will be useful when you need to go over the properties of objects to compare them.

// Your code here.
function deepEqual(obj1, obj2) {
  if (typeof obj1 !== "object") {
    return obj1 === obj2;
  } else {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
    if (obj1Keys.length !== obj2Keys.length) {
      return false;
    } else {
      for (let i = 0; i < obj1Keys.length; i++) {
        if (!deepEqual(obj1[obj1Keys[i]], obj2[obj1Keys[i]])) {
          return false;
        }
      }
    }
  }
  return true;
}

// Redone version
function deepEqual(a, b) {
  if (a === b) return true;
  if (a == null || typeof a != "object" || b == null || typeof b != "object")
    return false;
  let keysA = Object.keys(a);
  let keysB = Object.keys(b);
  if (keysA.length !== keysB.length) {
    return false;
  }
  for (let i = 0; i < keysA.length; i++) {
    return deepEqual(a[keysA[i]], b[keysB[i]]);
  }
}

let obj = { here: { is: "an" }, object: 2 };
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }));
// → false
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
// → true
