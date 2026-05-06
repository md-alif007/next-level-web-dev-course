type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
    color?: string;
}

// pick utility
type ProductSummary = Pick<Product, "id" | "name" | "price">;

// omit utility

type ProductWithoutStock = Omit<Product, "stock">;

// required

type RequiredProduct = Required<Product>;

// partial

type OptionalProduct = Partial<Product>;

// record

/* to declare a empty object record<> can be used.
record <string , unknown>  : 
<string> is used because the keys are always string .
<unknown> is used because the values are unknown and anything can be used . */

const emptyObj: Record<string, unknown> = {};