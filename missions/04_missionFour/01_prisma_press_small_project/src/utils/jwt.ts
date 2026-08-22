import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const createToken = (
  payLoad: JwtPayload,
  secret: string,
  expiresIn: SignOptions,
) => {
  const token = jwt.sign(payLoad, secret, {
    expiresIn,
  } as SignOptions);

  return token;
};

export const jwtUtils = {
  createToken,
};
