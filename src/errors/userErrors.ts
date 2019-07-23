import { TError } from "@appTypes/error";

export const HashingErr = (): TError => ({
  statusCode: 400,
  name: "Hashing Error",
  msg: "An error occured while hashing the password"
});

export const ExistingEmail = (): TError => ({
  statusCode: 400,
  name: "Existing Email",
  msg: "Given email already exists"
});
