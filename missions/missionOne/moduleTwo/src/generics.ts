type GenericArray<T> = Array<T>

// const friends : string[] = ["a" , "b" , "c"]
const friends: GenericArray<string> = ["a", "b", "c"];

// const rollNumbers: number[] = [1, 2, 3]
const rollNumbers: GenericArray<number> = [1, 2, 3];


// --------------------------------------------------


type CoOrdinates<X, Y> = [X, Y];

const coOrdinates1: CoOrdinates<number, number> = [20, 30];

const coOrdinates2: CoOrdinates<string, string> = ["20", "30"];
