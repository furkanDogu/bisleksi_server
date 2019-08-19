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

export const EmailDoesntExists = ({ from, errItself }: TErrorFuncParams) =>
  JSON.stringify({
    statusCode: 400,
    name: "Resetting Password Error",
    msg: "Email doesn't exists",
    from,
    errItself
  });

export const InvalidResetCode = ({ from, errItself }: TErrorFuncParams) =>
  JSON.stringify({
    statusCode: 400,
    name: "Invalid Password Reset Code Error",
    msg: "Given reset code is invalid",
    from,
    errItself
  });

export const InvalidToken = ({ from, errItself }: TErrorFuncParams) =>
  JSON.stringify({
    statuscode: 401,
    name: "Invalid Token",
    msg: "Token is invalid",
    from,
    errItself
  });
