/*

Problem 1:
Create a TypeScript function filterEvenNumbers that accepts an array of numbers and returns a new array containing only the even numbers.

// Sample Input:
filterEvenNumbers([1, 2, 3, 4, 5, 6])

// Sample Output:
[2, 4, 6]

*/

// const filterEvenNumbers = (num: number[]): number[] => {
//   let array: number[] = [];

//   for (let index = 0; index < num.length; index++) {
//     if (num[index]! % 2 === 0) {
//       array.push(num[index]!);
//     }
//   }

//   return array;
// };

const filterEvenNumbers = (num: number[]): number[] => {
  let array: number[] = [];

  for (const element of num) {
    if (element % 2 === 0) {
      array.push(element);
    }
  }

  return array;
};
