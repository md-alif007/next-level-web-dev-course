type RichPeopleVehicle = {
    car: string,
    bike: string,
    plane: string
}

type MyVehicle1 = "bike" | "car" | "plane";
type MyVehicle2 = keyof RichPeopleVehicle;

// --------------------------------------------

const getPropertyFromObj = <T>(obj: T, key: keyof T) => {
    return obj[key];
}

type User = {
    id: number,
    name: string,
    address: {
        city: string
    }
}

const user: User = {
    id: 246,
    name: "alif",
    address: {
        city: "dhaka"
    }
}

const result1 = getPropertyFromObj(user, "id");
console.log(result1);

const product = {
    brand: "hp",
}

const result2 = getPropertyFromObj(product, "brand");
console.log(result2);
