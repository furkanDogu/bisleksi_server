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

  mongoose.connection.on("error", error => {
    const formedError = connError();
    console.error(formedError, error);
    throw new Error(formedError.msg);
  });
};

export default initMongo;
