import bcrypt from "bcrypt";
import config from "../../config/config";
import { prisma } from "../../lib/prisma";
import { CreateUserPayLoad } from "./user.interface";

const createUserIntoDB = async (payLoad: CreateUserPayLoad) => {
  const { name, email, password, profilePhoto } = payLoad;

  // does the user exist with the same email
  const isUserExist = await prisma.user.findUnique({
    where: { email },
  });
  if (isUserExist) {
    throw new Error("user with this email already exists!!");
  }

  // hashing the password
  const hashPassword = await bcrypt.hash(
    password,
    // salt
    Number(config.bcrypt_salt_rounds),
  );

  // this created user contains name , email , pass and mostly importantly id -> which will be used later .
  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  // creating profile
  await prisma.profile.create({
    data: {
      userId: createdUser.id,
      profilePhoto,
    },
  });

  // main user whcich will be shown in db
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

const getMyProfileFromDB = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });
  return user
};

export const userService = {
  createUserIntoDB,
  getMyProfileFromDB,
};
