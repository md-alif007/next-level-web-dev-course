import { prisma } from "../../lib/prisma";
import { ICreatePostPayLoad, IupdatePostPayLoad } from "./post.interface";

const createPostIntoDB = async (
  payLoad: ICreatePostPayLoad,
  user_id: string,
) => {
  const result = await prisma.post.create({
    data: {
      ...payLoad,
      userId: user_id,
    },
  });
  return result;
};

const getPostsFromDB = async () => {
  const result = await prisma.post.findMany({
    include: {
      user: {
        omit: {
          id: true,
          password: true,
          email: true,
        },
      },
      comments: true,
    },
  });
  return result;
};

const getStatsFromDB = () => {};

const getMyPostsFromDB = async (id: string) => {
  const result = await prisma.post.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comments: true,
      user: {
        omit: {
          id: true,
          password: true,
          email: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
  return result;
};

const getPostByIdFromDB = async (id: string) => {
  const result = await prisma.post.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const updatedResult = await prisma.post.update({
    where: {
      id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
    include: {
      user: {
        omit: {
          id: true,
          password: true,
          email: true,
        },
      },
      comments: true,
    },
  });
  return updatedResult;
};

const updateUserFromDB = async (
  userId: string,
  payLoad: IupdatePostPayLoad,
  isAdmin: boolean,
  postId: string,
) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  if (!isAdmin && post.userId !== userId) {
    throw new Error("You are not authorized to update the post");
  }

  const result = await prisma.post.update({
    where: {
      id: postId,
    },
    data: payLoad,
    include: {
      user: {
        omit: {
          id: true,
          password: true,
          email: true,
        },
      },
    },
  });

  return result;
};

const deleteUserFromDB = () => {};

export const postService = {
  createPostIntoDB,
  getPostsFromDB,
  getStatsFromDB,
  getMyPostsFromDB,
  getPostByIdFromDB,
  updateUserFromDB,
  deleteUserFromDB,
};
