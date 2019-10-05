import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { throwError } from "@services/errorService";

// middlewares are async because we don't want to call next() function explicitly
export default (schema: mongoose.Schema<any>) => {
  // Set the creation time of user
  schema.pre("save", async function() {
    //@ts-ignore
    if (!this.createdAt) this.createdAt = new Date();
  });

  // Hash the password of user while creating the account
  schema.pre("save", async function() {
    try {
      // @ts-ignore
      this.password = await bcrypt.hash(this.password, 11);
    } catch (errItself) {
      return throwError({
        errItself,
        from: "db_models:user:middlewares",
        msg: "An error occured while hashing the password"
      });
    }
  });
};
