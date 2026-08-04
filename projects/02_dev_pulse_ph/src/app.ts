import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import { authRouter } from "./modules/auth/auth.route";
import { issueRoute } from "./modules/issues/issues.route";
import globalErrorHandler from "./modules/middlewares/golbelErrorHandler";

const app: Application = express();

// cors
app.use(cors());

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

// global error handler
app.use(globalErrorHandler);

export default app;
