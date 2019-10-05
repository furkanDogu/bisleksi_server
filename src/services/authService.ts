import jwt from "jsonwebtoken";

import { throwError } from "@services/errorService";

import env from "@appConfig";

// checks if the user authenticated. If invalid token is given, it will throw error while verifying.
export const isTokenValid = ({ req }: any) => {
  const { auth_token } = req.headers;

  if (!auth_token) {
    return throwError({
      from: "services:authService:isTokenValid",
      msg: "Token is invalid"
    });
  }

  return jwt.verify(auth_token, env.jwt_secret);
};
