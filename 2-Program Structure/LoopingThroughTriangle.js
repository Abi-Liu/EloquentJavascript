//Write a loop that makes seven calls to console.log to output the following triangle:

// #
// ##
// ###
// ####
// #####
// ######
// #######

let count = 0;
let str = "#";
while (count < 7) {
  console.log(str);
  count++;
  str += "#";
}
