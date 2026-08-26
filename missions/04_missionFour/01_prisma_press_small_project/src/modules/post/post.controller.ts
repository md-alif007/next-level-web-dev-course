import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";

const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const payLoad = req.body;

    const result = await postService.createPostIntoDB(payLoad, id as string);

    sendResponse(res, {
      success: true,
      successCode: HttpStatus.CREATED,
      message: "post created successfully!!!",
      data: result,
    });
  },
);

const getPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getPostsFromDB();
    sendResponse(res, {
      success: true,
      successCode: HttpStatus.OK,
      message: "post fetched successfully!!!",
      data: result,
    });
  },
);

const getStats = () => {};

const getMyPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;

    const result = await postService.getMyPostsFromDB(id as string);

    sendResponse(res, {
      success: true,
      successCode: HttpStatus.OK,
      message: "my post fetched successfully!!!",
      data: result,
    });
  },
);

const getPostById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;

    if (!postId) {
      throw new Error("post id is needed");
    }

    const result = await postService.getPostByIdFromDB(postId as string);

    sendResponse(res, {
      success: true,
      successCode: HttpStatus.OK,
      message: "post fetched successfully by id!!!",
      data: result,
    });
  },
);

const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const payLoad = req.body;
    const isAdmin = req.user?.role === "ADMIN";
    const postId = req.params.postId;

    const result = await postService.updatePostFromDB(
      userId as string,
      payLoad,
      isAdmin,
      postId as string,
    );

    sendResponse(res, {
      success: true,
      successCode: HttpStatus.OK,
      message: "post updated successfully!!!",
      data: result,
    });
  },
);

const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const isAdmin = req.user?.role === "ADMIN";
    const userId = req.user?.id;
    const postId = req.params.postId;

    const result = await postService.deletePostFromDB(
      isAdmin,
      userId as string,
      postId as string,
    );

    sendResponse(res, {
      success: true,
      successCode: HttpStatus.OK,
      message: "post deleted successfully!!!",
      data: {},
    });
  },
);

export const postController = {
  createPost,
  getPosts,
  getStats,
  getMyPosts,
  getPostById,
  updatePost,
  deletePost,
};
