import jwt from "jsonwebtoken";

import { InvalidToken } from "@services/errorService/userErrors";

import env from "@appConfig";

// checks if the user authenticated. If invalid token is given, it will throw error while verifying.
export const isTokenValid = ({ req }: any) => {
  const { auth_token } = req.headers;

  if (auth_token) {
    return jwt.verify(auth_token, env.jwt_secret);
  }

  throw new Error(InvalidToken({ from: "services:authService:isTokenValid" }));
};
