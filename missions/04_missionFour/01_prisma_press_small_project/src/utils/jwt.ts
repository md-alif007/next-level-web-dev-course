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

const verifyToken = (token: string, secret: string) => {
  try {
    const verifiedToken = jwt.verify(token, secret);
    return verifiedToken;
  } catch (error) {
    throw new Error("Invalid token!!!");
  }
};
export const jwtUtils = {
  createToken,
  verifyToken
};
