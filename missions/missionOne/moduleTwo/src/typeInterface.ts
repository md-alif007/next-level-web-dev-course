// this is an interface 
// interface : object type : array , obj , function .
interface Iuser {
    name: string,
    age: number
}

// it can extend also 
interface IuserWithRole extends Iuser {
    role: "admin" | "user"
}

type User = {
    name: string,
    age: number
}

type Role = {
    role: "admin" | "user"
}

type UserWithRole = User & Role;

const user1: User = {
    name: "alif",
    age: 22
}

// used interface instead of type
const user2: IuserWithRole = {
    name: "alifRahman",
    age: 23,
    role: "admin"
}