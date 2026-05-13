import { createServer, IncomingMessage, ServerResponse, Server } from "http";
import { routeHandler } from "./routes/route";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    routeHandler(req, res);
  },
);

server.listen(5000, () => {
  console.log("server is runnig on the port 5000");
});
