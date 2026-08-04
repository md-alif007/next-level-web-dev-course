import type { Request, Response } from "express";
import { issueService } from "./issues.service";

const createIssues = async (req: Request, res: Response) => {
  try {
    const payLoad = { ...req.body, reporter_id: req.user!.id };
    const result = await issueService.createIssueIntoDB(payLoad);
    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error.data,
    });
  }
};

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getAllIssuesFromDB();

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Not Found!",
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: "Issues retrived successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error.data,
    });
  }
};

const getSingleIssue = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await issueService.getSingleIssueFromDB(id as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Not Found!",
        data: {},
      });
    }

    res.status(200).json({
      success: true,
      message: "Issue retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error.data,
    });
  }
};

export const updateIssue = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await issueService.updateIssueIntoDB(
      id as string,
      req.body,
      req.user,
    );

    res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteIssue = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await issueService.deleteIssueFromDB(id as string);

  res.status(200).json({
    success: true,
    message: "Issue deleted successfully",
  });
};

export const issueController = {
  createIssues,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
