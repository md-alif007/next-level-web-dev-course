import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";

const app: Application = express();
const port = 5000;

app.use(express.json());

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_WInU3ZRXqs6h@ep-rapid-sunset-at2q2mo9-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

const initializingDataBase = async () => {
  try {
    await pool.query(
      `
      CREATE TABLE IF NOT EXISTS users
      (
      id SERIAL PRIMARY KEY,
      name VARCHAR(20),
      gmail VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(20),
      is_active BOOLEAN DEFAULT TRUE,
      age INT,

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )
      `,
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};
initializingDataBase();

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "express server",
    author: "alif",
  });
});

// post method
app.post("/api/users", async (req: Request, res: Response) => {
  const { name, gmail, password, age } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO 
      users(name , gmail , password , age) 
      VALUES($1,$2,$3,$4)
      RETURNING *
      `,
      [name, gmail, password, age],
    );

    res.status(201).json({
      message: "User created successfully:)",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
});

// gett all users
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `
        SELECT * FROM users
      `,
    );
    res.status(201).json({
      message: "Users retrived successfully:)",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
});

// gett single users
app.get("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT * FROM users WHERE id = $1
      `,
      [id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        message: "user not found",
        data: {},
      });
    }
    res.status(201).json({
      message: "User retrived successfully:)",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
});

// update method
app.put("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, gmail, password, is_active, age } = req.body;
  try {
    const result = await pool.query(
      `
      UPDATE users SET
      name = COALESCE($1,name),
      gmail = COALESCE($2,gmail),
      password = COALESCE($3,password),
      is_active = COALESCE($4,is_active),
      age = COALESCE($5,age)     
      WHERE id = $6
      RETURNING *
      `,
      [name, gmail, password, is_active, age, id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        message: "user not found",
        data: {},
      });
    }
    res.status(201).json({
      message: "User updated successfully:)",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
});

// delete method
app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
      DELETE FROM users WHERE id = $1
      `,
      [id],
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        message: "user not found",
        data: {},
      });
    }
    res.status(201).json({
      message: "User deleted successfully:)",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
