import config from "../../config/config";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../utils/jwt";
import { IloginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import Jwt, { SignOptions } from "jsonwebtoken";

const loginUserIntoDB = async (payLoad: IloginUser) => {
  const { email, password } = payLoad;

  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("password is not matched!");
  }

  const jwtPayLoad = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  /*  const accessToken = Jwt.sign(jwtPayLoad, config.jwt_access_secret, {
    expiresIn: config.jwt_access_expires_in,
  } as SignOptions);

    const refreshToken = Jwt.sign(jwtPayLoad, config.jwt_refresh_secret, {
    expiresIn: config.jwt_refresh_expires_in,
  } as SignOptions);*/

  const accessToken = jwtUtils.createToken(
    jwtPayLoad,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions,
  );

  const refreshToken = jwtUtils.createToken(
    jwtPayLoad,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions,
  );

  return { accessToken, refreshToken };
};

export const authService = {
  loginUserIntoDB,
};
