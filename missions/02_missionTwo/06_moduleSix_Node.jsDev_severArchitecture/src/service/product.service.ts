import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), "./src/dataBase/database.json");

export const readProduct = () => {
  //   console.log(process.cwd());
  //   console.log(filePath);
  const products = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(products);
};

export const insertProduct = (payload: any) => {
  fs.writeFileSync(filePath, JSON.stringify(payload));
};
