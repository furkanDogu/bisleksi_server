import mongoose from "mongoose";

import { mongoURL } from "@appConfig";
import { connError } from "@errors/dbErrors";

const initMongo = () => {
  mongoose.connect(mongoURL, {
    useNewUrlParser: true
  });
  mongoose.connection.on("open", () => {
    console.log("Connected to mongoDB");
  });

  mongoose.connection.on("error", errItself => {
    throw new Error(connError({ from: "utils:mongoDB", errItself }));
  });
};

export default initMongo;
