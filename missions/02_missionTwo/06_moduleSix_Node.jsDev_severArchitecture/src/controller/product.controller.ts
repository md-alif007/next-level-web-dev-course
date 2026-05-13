import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";
import type { Iproduct } from "../types/product.type";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  const urlParts = url?.split("/"); // products => /products/1 => ["" , "products" , "1"]
  // console.log(urlParts);

  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

  if (url === "/products" && method === "GET") {
    // const products = [
    //   {
    //     id: 1,
    //     name: "product - 1",
    //   },
    // ];
    const products = readProduct();

    res.writeHead(200, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "products retrived successfully",
        data: products,
      }),
    );
    // get single method
  } else if (method === "GET" && id != null) {
    const products = readProduct();

    const product = products.find((p: Iproduct) => p.id === id);
    // console.log(product);

    res.writeHead(200, { "Content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "product retrived successfully",
        data: product,
      }),
    );
  }
};
