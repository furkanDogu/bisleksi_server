import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { hashSeed } from "../../../app_config.json";
import { HashingError } from "../../errors/userErrors";

// middlewares async because we don't want to call next() function explicitely
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
      this.password = await bcrypt.hash(this.password, hashSeed);
    } catch (e) {
      const formedError = HashingError();
      console.error(formedError, e);
      throw new Error(formedError.msg);
    }
  });
};
