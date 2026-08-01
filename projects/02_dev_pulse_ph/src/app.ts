import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRouter } from "./modules/auth/auth.route";

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "express server",
    author: "Mohammad Alif Rahman",
  });
});

// users
app.use("/api/auth",userRouter)



export default app;
