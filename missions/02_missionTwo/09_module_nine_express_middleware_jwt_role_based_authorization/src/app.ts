import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { usersRouter } from "./users/user.route";

const app: Application = express();
const port = 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "express server module 9",
    author: "Mohammad Alif Rahman",
  });
});

app.use("/api/users" , usersRouter)

export default app;
