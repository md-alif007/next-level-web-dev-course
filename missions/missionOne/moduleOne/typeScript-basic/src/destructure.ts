// object destructure 
const user = {
    name: {
        firstName: "mohammad",
        middleName: "alif",
        lastName: "Rahman"
    },
    age: 22,
    gender: "male",
    hobbies: {
        numOne: "travelling",
        numTwo: "exercise"
    },
    favColor: "Black"
};

const { favColor: myFavColor, name: { middleName: myMiddleName } } = user;
console.log(myFavColor, myMiddleName);
