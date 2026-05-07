"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Animal {
    name;
    type;
    age;
    constructor(name, type, age) {
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
    name;
    brand;
    speed;
    constructor(name, brand, speed) {
        this.name = name;
        this.brand = brand;
        this.speed = speed;
    }
    carSpeed() {
        console.log(`${this.name} speed is ${this.speed}`);
    }
}
const car = new Car("bmw8", "bmw", 180);
console.log(car.name);
car.carSpeed();
//# sourceMappingURL=classAndObject.js.map