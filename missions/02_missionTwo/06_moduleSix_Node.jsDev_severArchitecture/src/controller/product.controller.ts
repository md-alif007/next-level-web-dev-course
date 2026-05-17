import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  //   Get all products 
  if (url === "/products" && method === "GET") {
    // const products = [
    //   {
    //     id: 1,
    //     name: "Keyboard",
    //     price: 2500,
    //   },
    // ];
    const products = readProduct();
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "products retrived successfully",
        data: { products },
      }),
    );
  }
};
