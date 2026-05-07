/*
Create a class Person with a name and age. Then, create a subclass Student that adds a grade property. Include a method getDetails in the Student class that returns a string with the student's name, age, and grade.

// Sample Input:
const student = new Student("Alice", 20, "A");
student.getDetails();

// Sample Output:
"Name: Alice, Age: 20, Grade: A";
*/

class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

class Student extends Person {
  grade: string;

  constructor(name: string, age: number, grade: string) {
    super(name, age);
    this.grade = grade;
  }

  getDetails() {
    console.log(`"Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}"`);
  }
}

// const student = new Student("Alice", 20, "A");
// student.getDetails();
