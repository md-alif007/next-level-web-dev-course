class Person {
  name: string; /*common*/
  age: number; /*common*/
  address: string; /*common*/

  constructor(name: string, age: number, address: string) {
    this.name = name;
    this.age = age;
    this.address = address;
  }

  /*common method */
  getSleep(hourOfstudy: number) {
    console.log(`${this.name} studies ${hourOfstudy} hour`);
  }
}

class Student extends Person {}

const Student1 = new Student("alif", 22, "dhaka");
Student1.getSleep(15);

class Teacher extends Person {
  designation: string; /*own property*/

  constructor(name: string, age: number, address: string, designation: string) {
    super(name, age, address);
    this.designation = designation;
  }

  /*own method */
  takeClass(classHour: number) {
    console.log(`${this.name} took ${classHour} hours class`);
  }
}
const teacher1 = new Teacher("mr.teacher1", 35, "dhaka", "sr.teacher1");
teacher1.takeClass(5);
