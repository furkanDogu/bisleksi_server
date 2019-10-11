import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import _unset from "lodash/unset";

import { IUpdatePassword, IUser, IValidateResetCode } from "@appTypes/user";
import { User } from "@models";
import env from "@appConfig";

import mailService from "@services/mailService";
import { error } from "@services/errorService";
import { createToken } from "@services/authService";

export const userMutations = {
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

    return createToken({ email: userDoc.toObject().email }, "1h");
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
