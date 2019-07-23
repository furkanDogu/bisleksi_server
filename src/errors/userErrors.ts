import { TErrorFuncParams } from "@appTypes/error";

export const HashingErr = ({ from, errItself }: TErrorFuncParams) =>
  JSON.stringify({
    statusCode: 400,
    name: "Hashing Error",
    msg: "An error occured while hashing the password",
    from,
    errItself
  });

export const ExistingEmail = ({ from, errItself }: TErrorFuncParams) =>
  JSON.stringify({
    statusCode: 400,
    name: "Existing Email",
    msg: "Given email already exists",
    from,
    errItself
  });

export const LoginError = ({ from, errItself }: TErrorFuncParams) =>
  JSON.stringify({
    statusCode: 401,
    name: "Login Error",
    msg: "Email or password is incorrect",
    from,
    errItself
  });
