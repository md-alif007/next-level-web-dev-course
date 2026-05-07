const arrayOfNumber: number[] = [1, 2, 3];

// const arrayOfString : string[] = ["1", '2', "3"];

const arrayOfStringUsingMap: string[] = arrayOfNumber.map((num) => num.toString());

console.log(arrayOfStringUsingMap);

// -------------------------------------------------------------------

// map types

type AreaInNumbers = {
    height: number,
    width: number
}

// type AreaInStrings = {
//     height: string,
//     width: string
// }

type AreaInStrings = {

    // 1. hard qouted way : [key in "height" | "width"]: string;

    // 2 . with keyof 
    [key in keyof AreaInNumbers]: string;

}

// --------------------------------------------------------------------

type Area<T> = {
    [key in keyof T]: T[key];
    
    /*

    keyof T means : "height" | "isWorthy" (union)
    so 
    whenever it is height : string should be assigned : [key in "height"]: string;
    and
    whenever it is isWorthy : boolean should be assigned : [key in "isWorthy": boolean;
    
    T[key] ?
    T = {height: string,isWorthy: boolean} 
    key -> height
    key -> width 
    here the object notation is being used 
    T["height"] -> string
    T["isWorthy"] -> boolean 

    */
}

type AreaMeasurement = {
    height: string,
    isWorthy: boolean
}

const areaOne: AreaMeasurement = {
    height: "15",
    isWorthy: true
}