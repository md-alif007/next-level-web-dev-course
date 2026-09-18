import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status";
import { Prisma } from "../../generated/prisma/client";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("error : ", err);

  let successCode;
  let errorMessage = err.message;
  let errorName = err.name || "INTERNAL_SERVER_ERROR";

  if (err instanceof Prisma.PrismaClientValidationError) {
    successCode = HttpStatus.BAD_REQUEST;
    errorMessage = "You have provided field type or missing fields";
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      successCode = HttpStatus.BAD_REQUEST;
      errorMessage = "Duplicate key error";
    } else if (err.code === "P2003") {
      successCode = HttpStatus.BAD_REQUEST;
      errorMessage = "Foreign key constraint failed";
    } else if (err.code === "P2025") {
      successCode = HttpStatus.BAD_REQUEST;
      errorMessage =
        "An operation failed because it depends on one or more records that were required but not found. ";
    }
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    successCode = HttpStatus.INTERNAL_SERVER_ERROR;
    errorMessage = "authentication failed";
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    successCode = HttpStatus.INTERNAL_SERVER_ERROR;
    errorMessage = "error occured while execution";
  }

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    successCode: successCode || HttpStatus.INTERNAL_SERVER_ERROR,
    errorName: errorName,
    message: errorMessage,
    error: err.stack,
  });
};
