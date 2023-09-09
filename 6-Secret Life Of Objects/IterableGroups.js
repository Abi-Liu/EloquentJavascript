// Make the Group class from the previous exercise iterable. Refer to the section about the iterator interface earlier in the chapter if you aren’t clear on the exact form of the interface anymore.

// If you used an array to represent the group’s members, don’t just return the iterator created by calling the Symbol.iterator method on the array. That would work, but it defeats the purpose of this exercise.

// It is okay if your iterator behaves strangely when the group is modified during iteration.

// Your code here (and the code from the previous exercise)
class Group {
  // Your code here.
  constructor() {
    this.members = [];
  }
  add(value) {
    if (!this.members.includes(value)) this.members.push(value);
  }

  delete(value) {
    const index = this.members.indexOf(value);
    if (index !== -1) {
      this.members = this.members
        .slice(0, index)
        .concat(this.members.slice(index + 1));
    }
  }

  has(value) {
    const index = this.members.indexOf(value);
    if (index === -1) return false;
    else return true;
  }

  static from(arr) {
    const group = new Group();
    for (let element of arr) {
      group.add(element);
    }
    return group;
  }

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}

class GroupIterator {
  constructor(group) {
    this.currentPosition = 0;
    this.group = group;
  }

  next() {
    if (this.currentPosition < this.group.members.length) {
      const result = {
        value: this.group.members[this.currentPosition],
        done: false,
      };
      this.currentPosition += 1;
      return result;
    } else {
      return { done: true };
    }
  }
}

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c
