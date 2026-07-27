import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { usersRouter } from "./modules/users/user.route";
import { profilesRoute } from "./modules/profiles/profiles.route";
import { authRoute } from "./modules/auth/auth.route";
import logger from "./middlewares/logger";
import CookieParser from "cookie-parser";
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app: Application = express();
const port = 5000;

// cookie parser
app.use(CookieParser());

app.use(express.json());

app.use(logger);

// cors
app.use(
  cors({
    origin: "http://localhost:5000",
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "express server module 9",
    author: "Mohammad Alif Rahman",
  });
});

app.use("/api/users", usersRouter);
app.use("/api/profiles", profilesRoute);
app.use("/api/auth", authRoute);

// Global Error Handling Middleware
app.use(globalErrorHandler);

export default app;
