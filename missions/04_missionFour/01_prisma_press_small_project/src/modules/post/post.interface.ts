import { POST_STATUS } from "../../../generated/prisma/enums";

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
