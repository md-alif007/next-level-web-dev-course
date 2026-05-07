class BankAccount {
  public readonly id: number;
  public name: string;
  private balance: number;

  constructor(id: number, name: string, balance: number) {
    this.id = id;
    this.name = name;
    this.balance = balance;
  }

  //   addBalance(newAdd: number) {
  //     this.balance = this.balance + newAdd;
  //     return this.balance;
  //   }

  //   using set
  set addBalance(newAdd: number) {
    this.balance = this.balance + newAdd;
  }

  //   getBalance() {
  //     return this.balance;
  //   }

  // using get
  get getBalance() {
    return this.balance;
  }
}

const myAccount = new BankAccount(246, "alif", 20);

// console.log(myAccount.addBalance(100));

myAccount.addBalance = 100;
console.log(myAccount);
