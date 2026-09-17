import { POST_STATUS } from "../../../generated/prisma/enums";
import { PostWhereInput } from "../../../generated/prisma/models";

export interface ICreatePostPayLoad {
  title: string;
  content: string;
  thumbnail?: string;
  isFeatured?: boolean;
  status: POST_STATUS;
  tags: string[];
}

export interface IupdatePostPayLoad {
  title?: string;
  content?: string;
  thumbnail?: string;
  isFeatured?: boolean;
  status?: POST_STATUS;
  tags?: string[];
}

export interface IPostQuery extends PostWhereInput {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortOrder?: string;
  sortBy?: string;
}
