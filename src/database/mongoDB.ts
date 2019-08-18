import mongoose from "mongoose";

import env from "@appConfig";

import { connError } from "@errors/dbErrors";

export default () => {
  console.log(env.mongo_url);
  mongoose.connect(env.mongo_url!, {
    useNewUrlParser: true
  });
  mongoose.connection.on("open", () => {
    console.log("Connected to mongoDB");
  });

  mongoose.connection.on("error", errItself => {
    throw new Error(connError({ from: "utils:mongoDB", errItself }));
  });
};
