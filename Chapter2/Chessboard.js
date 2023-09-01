// Write a program that creates a string that represents an 8×8 grid, using newline characters to separate lines. At each position of the grid there is either a space or a "#" character. The characters should form a chessboard.

// Passing this string to console.log should show something like this:

//  # # # #
// # # # #
//  # # # #
// # # # #
//  # # # #
// # # # #
//  # # # #
// # # # #
// When you have a program that generates this pattern, define a binding size = 8 and change the program so that it works for any size, outputting a grid of the given width and height.

let size = 8;
let str = "";
for (let i = 0; i < size; i++) {
  for (let j = 0; j < size; j++) {
    if (i % 2 === 0) {
      if (j % 2 === 0) {
        str += " ";
      } else {
        str += "#";
      }
    } else {
      if (j % 2 === 1) {
        str += " ";
      } else {
        str += "#";
      }
    }
  }
  str += "\n";
}
console.log(str);
