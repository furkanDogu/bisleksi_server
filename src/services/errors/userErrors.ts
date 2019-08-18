import { TErrorFuncParams } from "@appTypes/error";

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
