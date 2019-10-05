import { TErrorFuncParams } from "@appTypes/error";

export const throwError = ({
  from,
  errItself,
  msg
}: TErrorFuncParams): never => {
  throw new Error(
    JSON.stringify({
      msg,
      from,
      errItself
    })
  );
};
