import type { NextFunction, Request, Response } from "express";
import sendResponse from "../../utility/sendResponse";

const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const message = err instanceof Error ? err.message : "Internal Server Error";

  sendResponse(res, {
    statusCode: 500,
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandler;
