import express, { type Application, type Request, type Response } from "express"
import { Pool } from "pg"

const app: Application = express()
const port = 5000

// [middler]
app.use(express.json());

const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_VbM2sOLej6qm@ep-rapid-pine-ahv6dr05-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
});

const initializeDataBase = async () => {

    try {
        await pool.query(
            `
            CREATE TABLE IF NOT EXISTS users
            (
            id SERIAL PRIMARY KEY,
            name VARCHAR(20),
            email VARCHAR(20) NOT NULL,
            password VARCHAR(20) NOT NULL,
            is_active BOOLEAN DEFAULT TRUE ,
            age INT,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `
        )
        console.log("Data base connected successfully")
    } catch (error) {
        console.log(error)
    }

}
initializeDataBase();

// [get method]
app.get('/', (req: Request, res: Response) => {
    // res.send('Hello World!')
    res.status(200).json({
        "message": "express server",
        "author": "next level"
    });
});

// [post method]
app.post("/", async (req: Request, res: Response) => {
    // console.log(req.body)
    const { name, author, email, password } = req.body
    res.status(201).json({
        message: "created",
        data: {
            name,
            author,
            email
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});