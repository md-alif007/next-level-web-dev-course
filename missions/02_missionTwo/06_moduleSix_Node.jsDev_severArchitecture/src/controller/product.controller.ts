import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  const products = readProduct();

  /* 
    to get single porducts :
    products => /products/1  => ['' ,'products','1']
  */
  const urlParts = url?.split("/");
  // console.log(urlParts);
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

  // Get all products
  if (url === "/products" && method === "GET") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "porducts retrives successfully",
        data: products,
      }),
    );
  } else if (method === "GET" && id != null) {
    /* 
    to get single porducts :
  */
    const products = readProduct();

    const product = products.find((p: IProduct) => p.id === id);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "porducts retrives successfully",
        data: product,
      }),
    );
  } else if (method === "POST" && url === "/products") {
    // post method
    const body = await parseBody(req);

    const newProduct = {
      id: Date.now(),
      ...body,
    };
    // created product by post method
    const products = readProduct();

    products.push(newProduct);

    insertProduct(products);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "porducts received successfully",
        data: newProduct,
      }),
    );
  } else if (method === "PUT" && id !== null) {
    //PUT method
    const body = await parseBody(req);
    const products = readProduct();

    const index = products.findIndex((p: IProduct) => p.id === id);
    // console.log(index)
    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "porduct not found",
          data: null,
        }),
      );
    }

    products[index] = {
      id: products[index].id,
      ...body,
    };

    insertProduct(products);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "porduct updated successfully",
        data: products[index],
      }),
    );
  }
};
