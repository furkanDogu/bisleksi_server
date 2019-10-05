import mongoose from "mongoose";

import env from "@appConfig";

import { throwError } from "@services/errorService";

export default () => {
  mongoose.connect(env.mongo_url, {
    useNewUrlParser: true
  });
  mongoose.connection.on("open", () => {
    console.log("Connected to mongoDB");
  });

  mongoose.connection.on("error", errItself => {
    return throwError({
      errItself,
      from: "utils:mongoDB",
      msg: "Couldn't connect to the database"
    });
  });
};
