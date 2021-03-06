import mongoose, { Schema } from "mongoose";

import applyMiddlewares from "./middlewares";
import { isEmailValid, isBirthDayValid } from "./validation";
import { IUser } from "@appTypes/user";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 35,
    lowercase: true,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    maxlength: 75,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
    unique: true,
    trim: true,
    validate: {
      validator: async (email: string) => await isEmailValid(email)
    }
  },
  password: {
    type: String,
    required: true,
    maxLength: 20
  },
  birthday: {
    type: Date,
    required: true,
    validate: {
      validator: async (birthday: Date | string) =>
        await isBirthDayValid(birthday)
    }
  },
  gameInfo: [
    new Schema({
      gameId: { type: Schema.Types.ObjectId, ref: "Game", required: true },
      scores: { type: [Number] }
    })
  ],
  role: { type: String, default: "user" },
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
  },
  refresh_token: {
    type: String,
    default: null
  }
});

applyMiddlewares(userSchema);

export const User = mongoose.model<IUser>("User", userSchema);
