import { Response } from "express";

type Tmeta = {
  page: number;
  limit: number;
  total: number;
};

type TresponseData<T> = {
  success: boolean;
  successCode: number;
  message: string;
  data: T;
  meta?: Tmeta;
};

export const sendResponse = <T>(res: Response, data: TresponseData<T>) => {
  res.status(data.successCode).json({
    success: data.success,
    successCode: data.successCode,
    message: data.message,
    data: data.data,
    meta: data.meta,
  });
};