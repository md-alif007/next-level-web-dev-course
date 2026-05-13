import { createServer, IncomingMessage, ServerResponse, Server } from "http";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

    if (url === "/" && method === "GET") {
      res.writeHead(200, { "Content-type": "application/json" });
      /* 
            res.end({ message: "This is root route" });
            -> this crashes the server . have to send it in string or buffer . need to stringify it . 
            */
      res.end(JSON.stringify({ message: "this is root route" }));
    } else if (url?.startsWith("/products")) {
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(JSON.stringify({ message: "this is products route" }));
    } else {
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(JSON.stringify({ message: "route not found" }));
    }
  },
);

server.listen(5000, () => {
  console.log("server is runnig on the port 5000");
});
