/*
Create a function getIntersection that takes two arrays of numbers and returns a new array containing only the elements that are present in both arrays.

// Sample Input:
getIntersection([1, 2, 3, 4, 5], [3, 4, 5, 6, 7])

// Sample Output:
[3, 4, 5]
*/

const getIntersection = (arr1: number[], arr2: number[]): number[] => {
  const arr3: number[] = [];

  for (let i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i])) {
      arr3.push(arr1[i]);
    }
  }
  return arr3;
};

// console.log(getIntersection([1, 2, 3, 4, 5], [3, 4, 5, 6, 7]));
