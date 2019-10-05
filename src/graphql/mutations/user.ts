import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import _unset from "lodash/unset";

import {
  IRegisterUser,
  ILoginUser,
  IUpdatePassword,
  IUser,
  IValidateResetCode
} from "@appTypes/user";
import { User, Game } from "@models";
import env from "@appConfig";

import mailService from "@services/mailService";
import { error } from "@services/errorService";

export const userMutations = {
  register: async (
    _: IUser,
    { name, surname, email, password, profileName, birthday }: IRegisterUser
  ) => {
    const anyUser = await User.findOne({ email });
    if (anyUser)
      return error({
        from: "mutations:user:register",
        msg: "Given email already exists"
      });

    const gameInfo = (await Game.find({}).select("_id")).map(game => ({
      gameId: game._id,
      score: 0
    }));

    const user = (await User.create({
      name,
      surname,
      email,
      password,
      profileName,
      birthday,
      gameInfo
    })).toObject();

    _unset(user, "password");

    return jwt.sign(user, env.jwt_secret);
  },

  login: async (_: IUser, { email, password }: ILoginUser) => {
    const userDoc = await User.findOne({ email });
    if (!userDoc)
      return error({
        from: "mutations:user:login",
        msg: "Email or password is incorrect "
      });

    const isValid = await bcrypt.compare(password, userDoc.password);
    if (!isValid)
      return error({
        from: "mutations:user:login",
        msg: "Email or password is incorrect "
      });

    const user = userDoc.toObject();
    _unset(user, "password");

    return jwt.sign(user, env.jwt_secret);
  },

  sendResetEmail: async (_: IUser, { email }: { email: string }) => {
    const userDoc = await User.findOne({ email });
    if (!userDoc)
      return error({
        from: "mutations:user:sendResetEmail",
        msg: "Email doesn't exists"
      });

    const code = crypto.randomBytes(3).toString("hex");

    await User.updateOne(userDoc, {
      resetPasswordToken: code,
      resetTokenExpires: Date.now() + 3600000
    });

    await mailService.sendMail(userDoc.toObject(), code);
    return true;
  },

  validateResetCode: async (_: IUser, { code }: IValidateResetCode) => {
    const userDoc = await User.findOne({
      resetPasswordToken: code,
      resetTokenExpires: { $gt: Date.now() }
    });

    if (!userDoc)
      return error({
        from: "mutations:user:validateResetCode",
        msg: "Given reset code is invalid"
      });

    return jwt.sign({ email: userDoc.toObject().email }, env.jwt_secret, {
      expiresIn: "1h"
    });
  },

  updatePassword: async (
    _: IUser,
    { safetyToken, newPassword }: IUpdatePassword
  ) => {
    const { email } = jwt.verify(safetyToken, env.jwt_secret) as {
      email: string;
    };

    const userDoc = await User.findOne({ email });
    if (!userDoc)
      return error({
        from: "mutations:user:sendResetEmail",
        msg: "Email doesn't exists"
      });

    const password = await bcrypt.hash(newPassword, 11);
    await User.findOneAndUpdate(
      {
        _id: userDoc._id
      },
      { $set: { password, resetPasswordToken: null, resetTokenExpires: null } }
    );

    return true;
  }
};
