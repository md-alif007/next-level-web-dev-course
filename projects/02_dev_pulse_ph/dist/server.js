

   import { createRequire } from 'module';

   const require = createRequire(import.meta.url);

  

// src/app.ts
import express from "express";
import cors from "cors";

// src/modules/auth/auth.route.ts
import { Router } from "express";

// src/database/database.ts
import { Pool } from "pg";

// src/config/config.ts
import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.join(process.cwd(), ".env")
});
var config = {
  port: process.env.PORT,
  connection_string: process.env.CONNECTION_STRING,
  secret: process.env.SECRET
};

// src/database/database.ts
var pool = new Pool({
  connectionString: config.connection_string
});
var initializingDatabase = async () => {
  try {
    await pool.query(
      `   
    CREATE TABLE IF NOT EXISTS users 
    (
    id SERIAL PRIMARY KEY ,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'contributor',

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
    `
    );
    await pool.query(
      `
      CREATE TABLE IF NOT EXISTS issues 
      (
      id SERIAL PRIMARY KEY,
      title VARCHAR(150) NOT NULL,
      description TEXT NOT NULL,
      type TEXT NOT NULL
        CHECK (type IN ('bug', 'feature_request')),
      status TEXT NOT NULL DEFAULT 'open'
        CHECK (status IN ('open', 'in_progress', 'resolved')),
      reporter_id INT NOT NULL,

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()

      )
      `
    );
    console.log("database connected successfully");
  } catch (error) {
    console.error(error);
  }
};

// src/modules/auth/auth.service.ts
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
var createUsersIntoDB = async (payLoad) => {
  const { name, email, password, role } = payLoad;
  const hashPassword = await bcrypt.hash(password, 10);
  const existingUser = await pool.query(
    `
    SELECT * FROM users WHERE email = $1
    `,
    [email]
  );
  if (existingUser.rows.length > 0) {
    throw new Error("Email already exists");
  }
  const result = await pool.query(
    `
        INSERT INTO 
        users(name, email, password, role)
        VALUES($1,$2,$3,COALESCE($4 , 'contributor'))
        RETURNING * 
        `,
    [name, email, hashPassword, role]
  );
  delete result.rows[0].password;
  return result;
};
var loginUserIntoDB = async (payLoad) => {
  const { email, password } = payLoad;
  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email = $1
    `,
    [email]
  );
  if (userData.rows.length === 0) {
    throw new Error("Not Found!");
  }
  const user = userData.rows[0];
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new Error("Invalid credentials!");
  }
  const jwtPayLoad = {
    id: user.id,
    name: user.name,
    role: user.role
  };
  const accessToken = jwt.sign(jwtPayLoad, config.secret, { expiresIn: "1d" });
  return { accessToken };
};
var authService = {
  createUsersIntoDB,
  loginUserIntoDB
};

// src/utility/sendResponse.ts
var sendResponse = (res, responseData) => {
  return res.status(responseData.statusCode).json({
    success: responseData.success,
    message: responseData.message,
    data: responseData.data,
    error: responseData.error
  });
};
var sendResponse_default = sendResponse;

// src/modules/auth/auth.controller.ts
var createUsers = async (req, res, next) => {
  try {
    const result = await authService.createUsersIntoDB(req.body);
    sendResponse_default(res, {
      statusCode: 201,
      success: true,
      message: "User registered successfully",
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};
var loginUser = async (req, res, next) => {
  try {
    const result = await authService.loginUserIntoDB(req.body);
    sendResponse_default(res, {
      statusCode: 200,
      success: true,
      message: "Login successful",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var authController = {
  createUsers,
  loginUser
};

// src/modules/auth/auth.route.ts
var router = Router();
router.post("/signup", authController.createUsers);
router.post("/login", authController.loginUser);
var authRouter = router;

// src/modules/issues/issues.route.ts
import { Router as Router2 } from "express";

// src/modules/issues/issues.service.ts
var createIssueIntoDB = async (payLoad) => {
  const { title, description, type, status, reporter_id } = payLoad;
  const user = await pool.query(
    `
    SELECT * FROM users WHERE id = $1
    `,
    [reporter_id]
  );
  if (user.rows.length === 0) {
    throw new Error("Reporter not found");
  }
  const result = await pool.query(
    `
        INSERT INTO issues (title,description,type,reporter_id)
        VALUES($1,$2,$3,$4)
        RETURNING *
        `,
    [title, description, type, reporter_id]
  );
  return result;
};
var getAllIssuesFromDB = async () => {
  const result = await pool.query(
    `
    SELECT * FROM issues 
    
    `
  );
  result.rows.forEach((issue) => {
    delete issue.password;
  });
  return result;
};
var getSingleIssueFromDB = async (id) => {
  const issueResult = await pool.query(`SELECT * FROM issues WHERE id = $1`, [
    id
  ]);
  if (issueResult.rows.length === 0) {
    return null;
  }
  const issue = issueResult.rows[0];
  const reporterResult = await pool.query(
    `SELECT id, name, role FROM users WHERE id = $1`,
    [issue.reporter_id]
  );
  issue.reporter = reporterResult.rows[0];
  delete issue.reporter_id;
  return issue;
};
var updateIssueIntoDB = async (id, payload, user) => {
  const issueResult = await pool.query(`SELECT * FROM issues WHERE id = $1`, [
    id
  ]);
  if (issueResult.rows.length === 0) {
    throw new Error("Issue not found");
  }
  const issue = issueResult.rows[0];
  if (user.role === "contributor") {
    if (issue.reporter_id !== user.id) {
      throw new Error("You are not authorized");
    }
    if (issue.status !== "open") {
      throw new Error("Only open issues can be updated");
    }
  }
  const title = payload.title ?? issue.title;
  const description = payload.description ?? issue.description;
  const type = payload.type ?? issue.type;
  const status = payload.status ?? issue.status;
  const result = await pool.query(
    `
    UPDATE issues
    SET
      title = $1,
      description = $2,
      type = $3,
      status = $4,
      updated_at = NOW()
    WHERE id = $5
    RETURNING *;
    `,
    [title, description, type, status, id]
  );
  return result.rows[0];
};
var deleteIssueFromDB = async (id) => {
  const result = await pool.query(
    `
    DELETE FROM issues
    WHERE id = $1
    RETURNING *;
    `,
    [id]
  );
  if (result.rowCount === 0) {
    throw new Error("Issue not found");
  }
  return result.rows[0];
};
var issueService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
  updateIssueIntoDB,
  deleteIssueFromDB
};

// src/modules/issues/issues.controller.ts
var createIssues = async (req, res, next) => {
  try {
    const payLoad = { ...req.body, reporter_id: req.user.id };
    const result = await issueService.createIssueIntoDB(payLoad);
    sendResponse_default(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully",
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};
var getAllIssues = async (req, res, next) => {
  try {
    const result = await issueService.getAllIssuesFromDB();
    if (result.rows.length === 0) {
      return sendResponse_default(res, {
        statusCode: 404,
        success: false,
        message: "Not Found!",
        data: {}
      });
    }
    sendResponse_default(res, {
      statusCode: 200,
      success: true,
      message: "Issues retrieved successfully",
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};
var getSingleIssue = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await issueService.getSingleIssueFromDB(id);
    if (!result) {
      return sendResponse_default(res, {
        statusCode: 404,
        success: false,
        message: "Not Found!",
        data: {}
      });
    }
    sendResponse_default(res, {
      statusCode: 200,
      success: true,
      message: "Issue retrieved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var updateIssue = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await issueService.updateIssueIntoDB(
      id,
      req.body,
      req.user
    );
    sendResponse_default(res, {
      statusCode: 200,
      success: true,
      message: "Issue updated successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
};
var deleteIssue = async (req, res, next) => {
  const { id } = req.params;
  const result = await issueService.deleteIssueFromDB(id);
  sendResponse_default(res, {
    statusCode: 200,
    success: true,
    message: "Issue deleted successfully"
  });
};
var issueController = {
  createIssues,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue
};

// src/modules/middlewares/verifyToken.ts
import jwt2 from "jsonwebtoken";
var verifyToken = (...roles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized!"
        });
      }
      const decoded = jwt2.verify(
        token,
        config.secret
      );
      const userData = await pool.query(
        `
        SELECT * FROM users WHERE id = $1
        `,
        [decoded.id]
      );
      const user = userData.rows[0];
      if (userData.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Not Found!"
        });
      }
      req.user = decoded;
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden!"
        });
      }
    } catch (error) {
      next(error);
    }
    next();
  };
};
var verifyToken_default = verifyToken;

// src/types/types.ts
var checkRole = {
  contributor: "contributor",
  maintainer: "maintainer"
};

// src/modules/issues/issues.route.ts
var router2 = Router2();
router2.post(
  "/",
  verifyToken_default(checkRole.maintainer, checkRole.contributor),
  issueController.createIssues
);
router2.get("/", issueController.getAllIssues);
router2.get("/:id", issueController.getSingleIssue);
router2.patch(
  "/:id",
  verifyToken_default(checkRole.maintainer, checkRole.contributor),
  issueController.updateIssue
);
router2.delete(
  "/:id",
  verifyToken_default(checkRole.maintainer),
  issueController.deleteIssue
);
var issueRoute = router2;

// src/modules/middlewares/golbelErrorHandler.ts
var globalErrorHandler = (err, req, res, next) => {
  const message = err instanceof Error ? err.message : "Internal Server Error";
  sendResponse_default(res, {
    statusCode: 500,
    success: false,
    message,
    error: err
  });
};
var golbelErrorHandler_default = globalErrorHandler;

// src/app.ts
var app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({
    message: "express server",
    author: "Mohammad Alif Rahman"
  });
});
app.use("/api/auth", authRouter);
app.use("/api/issues", issueRoute);
app.use(golbelErrorHandler_default);
var app_default = app;

// src/server.ts
var main = async () => {
  await initializingDatabase();
  app_default.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
};
main();
//# sourceMappingURL=server.js.map