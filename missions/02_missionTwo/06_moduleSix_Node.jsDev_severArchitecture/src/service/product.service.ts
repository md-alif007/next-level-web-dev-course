import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "./src/dataBase/database.json");

export const readProduct = () => {
  //   console.log(process.cwd());
  //   console.log(filePath);
  const products = fs.readFileSync(filePath, "utf-8");
  //   console.log(products.toString());
  //   console.log(products);
  return JSON.parse(products);
};
