import { createServer, IncomingMessage, Server, ServerResponse } from "http";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    // console.log(req.url);
    // console.log(req.method);

    const method = req.method;
    if (url === "/" && method === "GET") {
      console.log("this is root");
    }
  },
);

server.listen(5000, () => {
  console.log("server is running.");
});
