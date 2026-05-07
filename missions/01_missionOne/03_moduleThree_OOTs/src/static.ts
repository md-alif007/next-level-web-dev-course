class Counter {
  static count: number = 0;

  increment() {
    return (Counter.count += 1);
  }
  decrement() {
    return (Counter.count -= 1);
  }
}

//  holding memory
// const instance1 = new Counter();
// console.log(instance1.increment()); //1
// console.log(instance1.increment()); //2
// console.log(instance1.increment()); //3

// const instance2 = new Counter();
// console.log(instance2.increment()); //1
// console.log(instance2.increment()); //2
// console.log(instance2.increment()); //3

// after adding static
const instance1 = new Counter();
console.log(instance1.increment()); //1
console.log(instance1.increment()); //2
console.log(instance1.increment()); //3

const instance2 = new Counter();
console.log(instance2.increment()); //4
console.log(instance2.increment()); //5
console.log(instance2.increment()); //6
