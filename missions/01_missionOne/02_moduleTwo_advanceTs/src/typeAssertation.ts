const kgToGMConverter = (input: string | number): string | number | undefined => {

    if (typeof input === "number") {
        return input * 1000;
    }
    else if (typeof input === "string") {
        const [value] = input.split(" ");
        return `converted output is : ${Number(value) * 1000}`
    }

}

const resul1 = kgToGMConverter(2) as number;
console.log(resul1);

const resul2 = kgToGMConverter("2 kg") as string;
console.log(resul2);
