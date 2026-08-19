import bcrypt from "bcrypt";
import config from "../../config/config";
import { prisma } from "../../lib/prisma";
import { CreateUserPayLoad } from "./user.interface";

const createUserIntoDB = async (payLoad: CreateUserPayLoad) => {
  const { name, email, password, profilePhoto } = payLoad;
  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });
  if (isUserExist) {
    throw new Error("user with this email already exists!!");
  }

  const hashPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  await prisma.profile.create({
    data: {
      userId: createdUser.id,
      profilePhoto,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email: createdUser.email || email,
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return user;
};

export const userService = {
  createUserIntoDB,
};
