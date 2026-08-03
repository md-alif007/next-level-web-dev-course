import type { Request, Response } from "express";
import { issueService } from "./issues.service";

const createIssues = async (req: Request, res: Response) => {
  try {
    const result = await issueService.createIssueIntoDB(req.body);
    res.status(200).json({
      success: true,
      message: "Issue created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.json(500).json({
      success: false,
      message: error.message,
      data: error.data,
    });
  }
};

export const issueController = {
  createIssues,
};
