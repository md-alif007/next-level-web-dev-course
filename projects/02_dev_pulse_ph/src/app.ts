import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { authRouter } from "./modules/auth/auth.route";
import { issueRoute } from "./modules/issues/issues.route";

const app: Application = express();

// middleware
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "express server",
    author: "Mohammad Alif Rahman",
  });
});

// users
app.use("/api/auth", authRouter);

// issues
app.use("/api/issues", issueRoute);

export default app;
