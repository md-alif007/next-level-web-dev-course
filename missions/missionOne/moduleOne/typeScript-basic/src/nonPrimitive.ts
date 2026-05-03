// 1. object
let user:
    {
        name: string;
        age: number;
        degree?: string  
        // ? this is optional type
    } =
{
    name: "Alif",
    age: 21
};

// 2. array
let numbers: number[] = [1, 2, 3];
let names: string[] = ["a", "b", "c"];

// 3. function
function add(a: number, b: number): number {
    return a + b;
}

// TypeScript-specific non-primitives (high value)

// 4. tuple (fixed-length array)
let person: [string, number] = ["Alif", 21];