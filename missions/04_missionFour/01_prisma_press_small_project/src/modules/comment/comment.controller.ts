import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { commentService } from "./comment.service";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";

const postComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId, ...payLoad } = req.body;
    const userId = req.user?.id;

    const result = await commentService.postCommentIntoDB(
      payLoad,
      postId as string,
      userId as string,
    );

    sendResponse(res, {
      success: true,
      successCode: HttpStatus.CREATED,
      message: "comment CREATED",
      data: result,
    });
  },
);

const getCommentById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId;

    const result = await commentService.getCommentByIdFromDB(
      commentId as string,
    );

    sendResponse(res, {
      success: true,
      successCode: HttpStatus.OK,
      message: "comment retrieved by comment Id successfully!!!",
      data: result,
    });
  },
);

const getCommentByUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    const result = await commentService.getCommentByUserFromDB(
      userId as string,
    );

    sendResponse(res, {
      success: true,
      successCode: HttpStatus.OK,
      message: "comments from the author retrieved",
      data: result,
    });
  },
);

export const commentController = {
  postComment,
  getCommentById,
  getCommentByUser,
};
