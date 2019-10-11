import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken";

import { ROLE_VALUES, TRoles, TTokenPayload } from "@appTypes/user";

import env from "@appConfig";

// checks if the user authenticated. If invalid token is given, it will throw error while verifying.
export const minRole = (
  { req }: ExpressContext,
  minRole: TRoles
): TTokenPayload => {
  const access_token = req.get("access_token");
  if (!access_token) {
    throw new AuthenticationError("Auth error");
  }
  let decodedToken: TTokenPayload;
  jwt.verify(access_token, env.jwt_secret, (e, decoded) => {
    if (
      e ||
      !(<TTokenPayload>decoded).role ||
      ROLE_VALUES[minRole] > ROLE_VALUES[(<TTokenPayload>decoded).role]
    )
      throw new AuthenticationError("Auth error");
    decodedToken = decoded as TTokenPayload;
  });
  return decodedToken!;
};

export const createToken = (info: any, exp: string) => {
  return jwt.sign(info, env.jwt_secret, {
    expiresIn: exp
  });
};
