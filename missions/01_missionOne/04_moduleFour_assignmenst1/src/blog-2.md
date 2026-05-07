                          Answer to the ques. no. 3
                          -------------------------
                            Usefulness of generics
                            -----------------------
Generics allow develpers to write clean code and reusable functions ,which helps to save time.
It helps to maintain strict type safely .


Here is a example of generics . Which is working with string , numbers and boolean . 
const createArrayWithGeneric = <T>(value: T) => {
  return [value];
};

const arrayString = createArrayWithGeneric("apple");
const arrayNumber = createArrayWithGeneric(246);
const arrayBoolean = createArrayWithGeneric(true);

console.log(arrayString);  // ["apple"]
console.log(arrayNumber);  // [246]
console.log(arrayBoolean); // [true]


A single generic function can work with interfaces , function and data types without losing type
checking.It makes TypeScript applications cleaner and easy to maintain.

