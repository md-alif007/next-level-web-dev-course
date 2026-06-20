import express, { type Application, type Request, type Response } from "express"
import { Pool, Result } from "pg"
import config from "./config";

const app: Application = express()
const port = config.port

// [middler]
app.use(express.json());

const pool = new Pool({
    connectionString: config.connection_string,
});

const initializeDataBase = async () => {

    try {
        await pool.query(
            `
            CREATE TABLE IF NOT EXISTS users
            (
            id SERIAL PRIMARY KEY,
            name VARCHAR(20),
            email VARCHAR(20) UNIQUE NOT NULL,
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

// console.log("PORT:", config.port);
// console.log("CONNECTION:", config.connection_string);
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
app.post("/api/users", async (req: Request, res: Response) => {
    // console.log(req.body)
    const { name, email, password, age } = req.body

    try {
        const result = await pool.query(
            `
        INSERT INTO 
        users(name ,email ,password ,age)
        VALUES($1,$2,$3,$4)
        RETURNING *
        `, [name, email, password, age]
        )
        console.log(result)

        res.status(201).json({
            message: "user created successfully! :)",
            data: result.rows[0]
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
});


// [gett method]
app.get("/api/users", async (req: Request, res: Response) => {

    try {
        const result = await pool.query(
            `
            SELECT * FROM users 
            `
        )
        res.status(200).json({
            success: true,
            message: "users retrived successfully! :)",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
})

// [gett method - single user]
app.get("/api/users/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {

        const result = await pool.query(
            `
            SELECT * FROM users WHERE id = $1 
            `, [id]
        );
        // console.log(result)

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: " user not found! :( ",
                data: {}
            })
        }

        res.status(200).json({
            success: true,
            message: "user retrived successfully! :)",
            data: result.rows[0]
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
})

// [putt method]
app.put("/api/users/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, password, age, is_active } = req.body;

    try {

        const result = await pool.query(
            `
        UPDATE users 
        SET name = COALESCE ($1, name), 
        password = COALESCE ($2,password),
        age = COALESCE ($3,age),
        is_active = COALESCE ($4,is_active)
        WHERE id = $5 
        RETURNING *
        `, [name, password, age, is_active, id]
        )

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: " user not found! :( ",
                data: {}
            })
        }

        res.status(200).json({
            success: true,
            message: "user updated successfully! :)",
            data: result.rows[0]
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }

})

// [delete method]
app.delete("/api/users/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {

        const result = await pool.query(
            `
            DELETE FROM users WHERE id = $1
            `, [id]
        )

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: " user not found! :( ",
                data: {}
            })
        }

        res.status(200).json({
            success: true,
            message: "user deleted successfully! :)",
            data: {}
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});