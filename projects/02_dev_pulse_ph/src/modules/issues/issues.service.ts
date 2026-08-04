import { pool } from "../../database/database";
import type { IIssue } from "./issues.interface";

const createIssueIntoDB = async (payLoad: IIssue) => {
  const { title, description, type, status, reporter_id } = payLoad;

  const user = await pool.query(
    `
    SELECT * FROM users WHERE id = $1
    `,
    [reporter_id],
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
    [title, description, type, reporter_id],
  );
  return result;
};

const getAllIssuesFromDB = async () => {
  const result = await pool.query(
    `
    SELECT * FROM issues 
    
    `,
  );
  result.rows.forEach((issue) => {
    delete issue.password;
  });
  return result;
};

const getSingleIssueFromDB = async (id: string) => {
  const issueResult = await pool.query(`SELECT * FROM issues WHERE id = $1`, [
    id,
  ]);

  if (issueResult.rows.length === 0) {
    return null;
  }

  const issue = issueResult.rows[0];

  const reporterResult = await pool.query(
    `SELECT id, name, role FROM users WHERE id = $1`,
    [issue.reporter_id],
  );

  issue.reporter = reporterResult.rows[0];
  delete issue.reporter_id;

  return issue;
};

const updateIssueIntoDB = async (
  id: string,
  payload: {
    title?: string;
    description?: string;
    type?: string;
    status?: string;
  },
  user: any,
) => {
  // Find Issue
  const issueResult = await pool.query(`SELECT * FROM issues WHERE id = $1`, [
    id,
  ]);

  if (issueResult.rows.length === 0) {
    throw new Error("Issue not found");
  }

  const issue = issueResult.rows[0];

  // Authorization
  if (user.role === "contributor") {
    if (issue.reporter_id !== user.id) {
      throw new Error("You are not authorized");
    }

    if (issue.status !== "open") {
      throw new Error("Only open issues can be updated");
    }
  }

  // Maintainer can update anything

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
    [title, description, type, status, id],
  );

  return result.rows[0];
};

const deleteIssueFromDB = async (id: string) => {
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


export const issueService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
  updateIssueIntoDB,
  deleteIssueFromDB
};
