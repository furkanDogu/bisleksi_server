import { TError } from "@appTypes/error";

export const connError = (): TError => ({
  statusCode: 503,
  name: "Database Service Unavailable",
  msg: "Couldn't connect to the database"
});
