import { COMMENT_STATUS, POST_STATUS } from "../../../generated/prisma/enums";
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

const getStatsFromDB = async () => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const totalPost = await tx.post.count();

    const totalPublishedPost = await tx.post.count({
      where: {
        status: POST_STATUS.PUBLISHED,
      },
    });
    const totalDraftPost = await tx.post.count({
      where: {
        status: POST_STATUS.DRAFTED,
      },
    });
    const totalArchivedPost = await tx.post.count({
      where: {
        status: POST_STATUS.ARCHIVED,
      },
    });

    const totalComments = await tx.comment.count();

    const totalApprovedComment = await tx.comment.count({
      where: {
        status: COMMENT_STATUS.APPROVED,
      },
    });
    const totalRejectedComment = await tx.comment.count({
      where: {
        status: COMMENT_STATUS.REJECT,
      },
    });

    const totalPostViewsAgg = await tx.post.aggregate({
      _sum: {
        views: true,
      },
    });
    const totalPostViews = totalPostViewsAgg._sum.views;

    return {
      totalPost,
      totalPublishedPost,
      totalArchivedPost,
      totalDraftPost,
      totalComments,
      totalApprovedComment,
      totalRejectedComment,
      totalPostViews,
    };
  });
  return transactionResult;
};

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
  // with out transaction
  /*
  const updatedResult = await prisma.post.update({
    where: {
      id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      user: {
        omit: {
          id: true,
          password: true,
          email: true,
        },
      },
      comments: {
        where: {
          status: COMMENT_STATUS.APPROVED,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
  */

  // with transaction
  const transactionResult = await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    const post = await tx.post.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        user: {
          omit: {
            id: true,
            password: true,
            email: true,
          },
        },
        comments: {
          where: {
            status: COMMENT_STATUS.APPROVED,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return post;
  });
  return transactionResult;
};

const updatePostFromDB = async (
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

const deletePostFromDB = async (
  isAdmin: boolean,
  userId: string,
  postId: string,
) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
  if (!isAdmin && post?.userId !== userId) {
    throw new Error("You are not authorized to update the post");
  }

  await prisma.post.delete({
    where: {
      id: postId,
    },
  });
};

export const postService = {
  createPostIntoDB,
  getPostsFromDB,
  getStatsFromDB,
  getMyPostsFromDB,
  getPostByIdFromDB,
  updatePostFromDB,
  deletePostFromDB,
};
