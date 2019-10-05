import jwt from "jsonwebtoken";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";

import { error } from "@services/errorService";
import { ROLE_VALUES, TRoles } from "@appTypes/user";

import env from "@appConfig";

type TToken = {
  role: TRoles;
};

// checks if the user authenticated. If invalid token is given, it will throw error while verifying.
export const minRole = ({ req }: ExpressContext, minRole: TRoles) => {
  const auth_token = req.get("auth_token");
  const errObj = {
    from: "services:authService:auth",
    msg: "Access denied"
  };

  if (!auth_token) {
    return error(errObj);
  }
  jwt.verify(auth_token, env.jwt_secret, (e, decoded) => {
    if (
      e ||
      !(<TToken>decoded).role ||
      ROLE_VALUES[minRole] > ROLE_VALUES[(<TToken>decoded).role]
    )
      return error(errObj);
  });
};
