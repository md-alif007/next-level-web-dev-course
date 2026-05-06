class Animal {
  name: string;
  type: string;
  age: number;

  constructor(name: string, type: string, age: number) {
    this.name = name;
    this.type = type;
    this.age = age;
  }

  yearOld() {
    console.log(`${this.name} is ${this.age} years old.`);
  }
}

const dog = new Animal("dogesh", "dog", 2);

console.log(dog.name);
dog.yearOld();

// ---------------------------------------------------------

// patameter operator

class Car {
  constructor(
    public name: string,
    public brand: string,
    public speed: number,
  ) {}
  carSpeed() {
    console.log(`${this.name} speed is ${this.speed}`);
  }
}

const car = new Car("bmw8", "bmw", 180);
console.log(car.name);
car.carSpeed();
