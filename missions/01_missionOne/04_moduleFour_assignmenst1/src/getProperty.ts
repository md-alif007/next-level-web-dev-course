/*

Write a generic function getProperty that takes an object and a key, then returns the value of that key. Use constraints to ensure the key exists on the object.

// Sample Input:
const user = { id: 1, name: "John Doe", age: 21 };
getProperty(user, "name");

// Sample Output:
"John Doe";

*/

const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key];
};

// const user = { id: 1, name: "John Doe", age: 21 };

// console.log(getProperty(user, "name")); // "John Doe"
// console.log(getProperty(user, "age")); // 21

//---------------------------- explanation ------------------------------

//  this is user
// const user = { id: 1, name: "John Doe", age: 21 };

// typescript infers user into type
// type user = {
//   id: number;
//   name: string;
//   age: number;
// };

// k -> keys .
// T -> object .
// keyof user = "id"| "name" | "age" ;
// k extends keyof T -> keys can only be "id"| "name" | "age" .
// T[k] -> keys of the object. -> object[key] -> user["id"] -> 1 .


