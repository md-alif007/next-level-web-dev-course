import type { NextFunction, Request, Response } from "express";
import { issueService } from "./issues.service";
import sendResponse from "../../utility/sendResponse";

const createIssues = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payLoad = { ...req.body, reporter_id: req.user!.id };
    const result = await issueService.createIssueIntoDB(payLoad);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Issue created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

const getAllIssues = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await issueService.getAllIssuesFromDB();

    if (result.rows.length === 0) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Not Found!",
        data: {},
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issues retrieved successfully",
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleIssue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  try {
    const result = await issueService.getSingleIssueFromDB(id as string);

    if (!result) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Not Found!",
        data: {},
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateIssue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    const result = await issueService.updateIssueIntoDB(
      id as string,
      req.body,
      req.user,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteIssue = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const result = await issueService.deleteIssueFromDB(id as string);

  sendResponse(res, {
    statusCode: 200,
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
