import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export const config = {
  port: process.env.PORT,
  connnection_string: process.env.CONNECTIONSTRING as string,
  secret: process.env.JWT_SECRET!,
  refresh_secret: process.env.REFRESH_SECTET!,
};
