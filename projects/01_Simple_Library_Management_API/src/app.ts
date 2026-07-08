import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
import { config } from "./config/config";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { bookRoute } from "./modules/book/book.route";

const app: Application = express();
const port = config.port;

app.use(express.json());

const pool = new Pool({
  connectionString: config.connectio_string,
});

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "express server",
    author: "alif",
  });
});

// user section
app.use("/api/users", userRoute);

// profiles section
app.use("/api/profile", profileRoute);

// book section
app.use("/api/books", bookRoute);

export default app;
