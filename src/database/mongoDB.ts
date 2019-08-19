import mongoose from "mongoose";

import env from "@appConfig";

import { connError } from "@services/errorService/dbErrors";

export default () => {
  mongoose.connect(env.mongo_url, {
    useNewUrlParser: true
  });
  mongoose.connection.on("open", () => {
    console.log("Connected to mongoDB");
  });

  mongoose.connection.on("error", errItself => {
    throw new Error(connError({ from: "utils:mongoDB", errItself }));
  });
};
