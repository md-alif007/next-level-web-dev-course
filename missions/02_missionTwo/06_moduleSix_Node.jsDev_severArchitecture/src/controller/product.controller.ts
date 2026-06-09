import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

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
    try {
      return sendResponse(res, 200, true, "product retrived successfully");
    } catch (error) {
      return sendResponse(res, 500, false, "something went wrong", error);
    }

  } else if (method === "GET" && id != null) {
    /* 
    to get single porducts :
  */
    const products = readProduct();

    const product = products.find((p: IProduct) => p.id === id);

    if (!product) {
      return sendResponse(res, 404, false, "product not found");
    }

    try {
      return sendResponse(
        res,
        200,
        true,
        "product retrived successfully",
        products,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "something went wrong", error);
    }

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
  } else if (method === "DELETE" && id !== null) {
    const products = readProduct();
    const index = products.findIndex((p: IProduct) => p.id === id);

    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "porduct not found",
          data: null,
        }),
      );
    }

    products.splice(index, 1);

    insertProduct(products);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "porduct deleted successfully",
        data: null,
      }),
    );
  }
};
