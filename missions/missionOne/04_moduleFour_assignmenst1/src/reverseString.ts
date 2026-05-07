/*
Write a function reverseString that takes a string as input and returns the reversed version of that string.

// Sample Input:
reverseString("typescript");

// Sample Output:
"tpircsepyt";
*/

const reverseString = (word: string): string => {
  let reversed = "";

  for (let i = word.length - 1; i >= 0; i--) {
    reversed = reversed + word[i];
  }

  return `"${reversed}"`;
};

