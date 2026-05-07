class Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Student extends Person {
  constructor(name: string) {
    super(name);
  }
  doStudy(numberOfHour: number) {
    console.log(`${this.name} studies ${numberOfHour} hour`);
  }
}

class Teacher extends Person {
  constructor(name: string) {
    super(name);
  }
  doTeach(hourOfTeaching: number) {
    console.log(`${this.name} studies ${hourOfTeaching} hour`);
  }
}

// function Guard

const isStudent = (user: Person) => {
  return user instanceof Student; /* it will show if it is true or false */
};

const isTeacher = (user: Person) => {
  return user instanceof Teacher;
};

const getUserInfo = (user: Person) => {
  if (/*user instanceof Student*/ isStudent(user)) {
    user.doStudy(10);
  } else if (/*user instanceof Teacher */ isTeacher(user)) {
    user.doTeach(5);
  }
};

const student1 = new Student("Mr.student1");
const teacher1 = new Teacher("Mr.teacher1");

getUserInfo(student1);
getUserInfo(teacher1);
