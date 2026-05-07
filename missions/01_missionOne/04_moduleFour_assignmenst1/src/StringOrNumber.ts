/* 

Define a union type StringOrNumber and create a function checkType that uses type guards to return "String" if the input is a string or "Number" if the input is a number.

// Sample Input 1:
checkType("Hello");

// Sample Output 1:
"String";

// Sample Input 2:
checkType(42);

// Sample Output 2:
"Number";

*/

type StringOrNumber = string | number;

const checkType = (input: StringOrNumber) => {
  if (typeof input === "string") {
    return "String";
  } else if (typeof input === "number") {
    return "Number";
  }
};
