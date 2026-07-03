import express,
{
    type Application,
    type Request,
    type Response
} from "express";
import config from "./config";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";

const app: Application = express()
const port = config.port

// [middler]
app.use(express.json());

// [get]
app.get('/', (req: Request, res: Response) => {
    // res.send('Hello World!')
    res.status(200).json({
        "message": "express server",
        "author": "next level"
    });
});

app.use('/api/users',userRoute);
app.use('/api/profile',profileRoute)

export default app;