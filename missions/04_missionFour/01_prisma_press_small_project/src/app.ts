import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config/config";
import { userRouter } from "./modules/user/user.route";
import { authRoute } from "./modules/auth/auth.route";
import { postRoute } from "./modules/post/post.route";
import { commentRoute } from "./modules/comment/comment.route";

const app: Application = express();

// cors
app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
  // const user = await prisma.user.findMany();
  // console.log(user);
  res.send("hello world");
});

// users
app.use("/api/users", userRouter);

// auth
app.use("/api/auth", authRoute);

// posts
app.use("/api/posts", postRoute);

// comments
app.use("/api/comments", commentRoute);

export default app;
