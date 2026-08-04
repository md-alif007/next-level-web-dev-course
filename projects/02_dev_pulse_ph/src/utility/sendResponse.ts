import type { Response } from "express";

interface TResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  error?: unknown;
}

const sendResponse = <T>(
  res: Response,
  responseData: TResponse<T>,
): Response => {
  return res.status(responseData.statusCode).json({
    success: responseData.success,
    message: responseData.message,
    data: responseData.data,
    error: responseData.error,
  });
};

export default sendResponse;
