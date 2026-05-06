class BankAccount {
  public readonly id: number;
  public name: string;
  private balance: number;
  //   protected can be used to use balance: number; in other methods . 

  constructor(id: number, name: string, balance: number) {
    this.id = id;
    this.name = name;
    this.balance = balance;
  }

  addBalance(newAdd: number) {
    this.balance = this.balance + newAdd;
    return this.balance;
  }
}

const myAccount = new BankAccount(246, "alif", 20);

console.log(myAccount.addBalance(100));
