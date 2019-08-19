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
      validator: async (birthday: Date | string) =>
        await isBirthDayValid(birthday)
    }
  },
  levels: [
    {
      gameId: { type: String, required: true },
      level: { type: Number, required: true }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: {
    type: String,
    default: null
  },
  resetTokenExpires: {
    type: Date,
    default: null
  }
});

applyMiddlewares(userSchema);

export default mongoose.model("User", userSchema);
