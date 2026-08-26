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

const updateComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId;
    const isAdmin = req.user?.role === "ADMIN";
    const userId = req.user?.id;
    const payLoad = req.body;

    const result = await commentService.updateCommentFromDB(
      commentId as string,
      userId as string,
      isAdmin,
      payLoad,
    );

    sendResponse(res, {
      success: true,
      successCode: HttpStatus.OK,
      message: "comment updated",
      data: result,
    });
  },
);

const deleteComment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.params.commentId;
    const userId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";

    const result = await commentService.deleteCommentFromDB(
      commentId as string,
      userId as string,
      isAdmin,
    );

    sendResponse(res, {
      success: true,
      successCode: HttpStatus.OK,
      message: "comment deleted successfully!!!",
      data: null,
    });
  },
);

export const commentController = {
  postComment,
  getCommentById,
  getCommentByUser,
  updateComment,
  deleteComment,
};
