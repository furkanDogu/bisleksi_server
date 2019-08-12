import { TErrorFuncParams } from "@appTypes/error";

export const connError = ({ from, errItself }: TErrorFuncParams) =>
  JSON.stringify({
    statusCode: 503,
    name: "Database Service Unavailable",
    msg: "Couldn't connect to the database",
    from,
    errItself
  });
