import { TError } from "../types/error";

export const HashingError = (): TError => ({
  statusCode: 400,
  name: "Hashing Error",
  msg: "An error occured while hashing the password"
});
