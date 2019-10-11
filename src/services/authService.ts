import jwt from "jsonwebtoken";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";

import { error } from "@services/errorService";
import { ROLE_VALUES, TRoles, TTokenPayload } from "@appTypes/user";

import env from "@appConfig";

// checks if the user authenticated. If invalid token is given, it will throw error while verifying.
export const minRole = ({ req }: ExpressContext, minRole: TRoles) => {
  const accessToken = req.get("accessToken");
  const errObj = {
    from: "services:authService:auth",
    msg: "Access denied"
  };

  if (!accessToken) {
    return error(errObj);
  }
  let decodedToken;
  jwt.verify(accessToken, env.jwt_secret, (e, decoded) => {
    if (
      e ||
      !(<TTokenPayload>decoded).role ||
      ROLE_VALUES[minRole] > ROLE_VALUES[(<TTokenPayload>decoded).role]
    )
      return error(errObj);
    decodedToken = decoded;
  });
  return decodedToken;
};

export const createToken = (info: any, exp: string) => {
  return jwt.sign(info, env.jwt_secret, {
    expiresIn: exp
  });
};
