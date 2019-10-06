import mongoose from "mongoose";

// middlewares are async because we don't want to call next() function explicitly
export default (schema: mongoose.Schema<any>) => {
  schema.pre("save", async function() {
    //@ts-ignore
    if (!this.createdAt) this.createdAt = new Date();
  });
};
