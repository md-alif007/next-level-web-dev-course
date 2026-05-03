// function -> arrow function , normal function 


// Normal 
function addNormal(num1: number, num2: number): number {
    return num1 + num2;
}

// arrow 
const addArrow = (numOne: number, numTwo: number): number => numOne + numTwo;


// obj -> function -> method 
const poorUser = {
    name: "alif",
    balance: 0,
    addBalance(value: number): number {
        const totalBalance = this.balance + value;
        return totalBalance;
    }
}