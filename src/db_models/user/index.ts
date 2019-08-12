import mongoose from "mongoose";

import applyMiddlewares from "./middlewares";
import { isEmailValid, isBirthDayValid } from "./validation";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 35
  },
  surname: {
    type: String,
    required: true,
    maxlength: 75
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
    unique: true,
    validate: {
      isAsync: true,
      validator: async (email: string) => await isEmailValid(email)
    }
  },
  password: {
    type: String,
    required: true,
    maxLength: 128
  },
  profileName: {
    type: String,
    required: true,
    maxLength: 15
  },
  birthday: {
    type: Date,
    required: true,
    validate: {
      isAsync: true,
      validator: async (birthday: Date | string) =>
        await isBirthDayValid(birthday)
    }
  },
  levels: [
    {
      gameId: { type: Number, required: true },
      level: { type: Number, required: true }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

applyMiddlewares(userSchema);

export default mongoose.model("User", userSchema);
