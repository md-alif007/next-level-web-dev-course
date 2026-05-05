const createArrayWithGeneric = <T>(value: T) => {
    return [value]
}

// const createArrayWithString = (value: string) => [value];

// const createArrayWithNumber = (value: number) => [value];

const arrayString = createArrayWithGeneric("apple");
const arrayNumber = createArrayWithGeneric(246);

// ----------------------------------------------------------------

// Tuple 

// const createArrayWithTuple = (param1: string, param2: string) => [param1, param2]

const createTuppleArrayWithGeneric = <X,Y>(param1: X, param2: Y) => [param1,param2];

const res1 = createTuppleArrayWithGeneric("alif",false);
