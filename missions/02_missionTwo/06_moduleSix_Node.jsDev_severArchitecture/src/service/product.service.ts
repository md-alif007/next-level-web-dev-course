import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), "./src/dataBase/database.json");

export const readProduct = () => {
  /* 
  console.log(process.cwd()); -> shows the file now we are in .
  -> C:\next-level-web-dev-course\missions\02_missionTwo\06_moduleSix_Node.jsDev_severArchitecture

  console.log(filePath);
  ->C:\next-level-web-dev-course\missions\02_missionTwo\06_moduleSix_Node.jsDev_severArchitecture\src\dataBase\database.json 
  */
  const products = fs.readFileSync(filePath, "utf-8");
  //   console.log(products.toString());
  // console.log(products);
  return JSON.parse(products);
};
