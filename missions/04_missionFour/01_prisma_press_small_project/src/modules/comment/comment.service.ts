import { prisma } from "../../lib/prisma";
import { ICreateCommentPayLoad } from "./comment.interface";

const postCommentIntoDB = async (
  payLoad: ICreateCommentPayLoad,
  postId: string,
  userId: string,
) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("post not found!!!");
  }
  const result = await prisma.comment.create({
    data: {
      ...payLoad,
      postId: postId,
      userId: userId,
    },
  });

  return result;
};

const getCommentByIdFromDB = async (commentId: string) => {
  const result = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
    include: {
      user: {
        omit: {
          id: true,
          password: true,
          email: true,
        },
      },
      post: {
        omit: {
          thumbnail: true,
          isFeatured: true,
          tags: true,
          views: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  if (!result) {
    throw new Error("No comment with this id");
  }

  return result;
};

const getCommentByUserFromDB = async (userId: string) => {
  const result = await prisma.comment.findMany({
    where: {
      userId,
    },
    include: {
      user: {
        omit: {
          id: true,
          password: true,
          email: true,
        },
      },
      post: {
        omit: {
          thumbnail: true,
          isFeatured: true,
          tags: true,
          views: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
  return result;
};

export const commentService = {
  postCommentIntoDB,
  getCommentByIdFromDB,
  getCommentByUserFromDB,
};
