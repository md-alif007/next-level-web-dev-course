import { pool } from "../../database/database";
import type { IIssue } from "./issues.interface";

const createIssueIntoDB = async (payLoad: IIssue) => {
  const { title, description, type, status, reporter_id } = payLoad;

  const result = await pool.query(
    `
        INSERT INTO issues (title,description,type,status)
        VALUES($1,$2,$3,$4,$5)
        RETURNING *
        `,
    [title, description, type, status, reporter_id],
  );
  return result;
};

export const issueService = {
  createIssueIntoDB,
};
