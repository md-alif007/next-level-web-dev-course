import type { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controller/product.controller";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-type": "application/json" });
    /*res.end({ message: "This is root route" }); -> this crashes the server . have to send it in string or buffer . 
      need to stringify it .*/
    res.end(JSON.stringify({ message: "this is root route" }));
  } else if (url?.startsWith("/products")) {
    productController(req, res);
  } else {
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "route not found" }));
  }
};
