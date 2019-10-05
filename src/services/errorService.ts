import { IErrorFuncParams } from "@appTypes/error";

export const throwError = ({
  from,
  errItself,
  msg
}: IErrorFuncParams): never => {
  throw new Error(
    JSON.stringify({
      msg,
      from,
      errItself
    })
  );
};
