import express, {
  type Application,
  type Request,
  type Response,
} from "express";
const app: Application = express();
const port = 5000;

app.use(express.json());

app.get("/user", (req: Request, res: Response) => {
  //   res.send('Hello World!!!!')
  res.status(200).json({
    message: "express server",
    author: "next level",
  });
});

app.post("/", async (req: Request, res: Response) => {
  console.log(req);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
