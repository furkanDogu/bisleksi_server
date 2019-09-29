import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import {
  ExistingEmail,
  LoginError,
  EmailDoesntExists,
  InvalidResetCode
} from "@services/errorService/userErrors";
import { generateLevels } from "@utils/generators";
import mailService from "@services/mailService";

import env from "@appConfig";
import {
  IRegisterUser,
  ILoginUser,
  IUpdatePassword,
  IUser,
  IValidateResetCode
} from "@appTypes/user";
import User from "@models/user";

const register = async (
  _: IUser,
  { name, surname, email, password, profileName, birthday }: IRegisterUser
) => {
  const user = await User.findOne({ email }, null, { lean: true }).exec();
  if (user) throw new Error(ExistingEmail({ from: "mutations:user:register" }));

  const userDoc = await User.create({
    name,
    surname,
    email,
    password,
    profileName,
    birthday,
    levels: generateLevels()
  });

  const newUser = userDoc.toObject();
  delete newUser.password;

  return jwt.sign(newUser, env.jwt_secret);
};

const login = async (_: IUser, { email, password }: ILoginUser) => {
  const userDoc = await User.findOne({ email });
  if (!userDoc) throw new Error(LoginError({ from: "mutations:user:login" }));

  const user = userDoc.toObject();

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error(LoginError({ from: "mutations:user:login" }));

  delete user.password;

  return jwt.sign(user, env.jwt_secret);
};

const sendResetEmail = async (_: IUser, { email }: { email: string }) => {
  const userDoc = await User.findOne({ email });
  if (!userDoc)
    throw new Error(
      EmailDoesntExists({ from: "mutations:user:sendResetEmail" })
    );

  const code = crypto.randomBytes(3).toString("hex");

  await User.updateOne(userDoc, {
    resetPasswordToken: code,
    resetTokenExpires: Date.now() + 3600000
  });

  await mailService.sendMail(userDoc.toObject(), code);
  return true;
};

const validateResetCode = async (_: IUser, { code }: IValidateResetCode) => {
  const userDoc = await User.findOne({
    resetPasswordToken: code,
    resetTokenExpires: { $gt: Date.now() }
  });

  if (!userDoc)
    throw new Error(
      InvalidResetCode({ from: "mutations:user:validateResetCode" })
    );

  return jwt.sign({ email: userDoc.toObject().email }, env.jwt_secret, {
    expiresIn: "1h"
  });
};

const updatePassword = async (
  _: IUser,
  { safetyToken, newPassword }: IUpdatePassword
) => {
  const { email } = jwt.verify(safetyToken, env.jwt_secret) as {
    email: string;
  };

  const userDoc = await User.findOne({ email });
  if (!userDoc)
    throw new Error(
      EmailDoesntExists({ from: "mutations:user:sendResetEmail" })
    );

  const password = await bcrypt.hash(newPassword, 11);
  await User.findOneAndUpdate(
    {
      _id: userDoc._id
    },
    { $set: { password, resetPasswordToken: null, resetTokenExpires: null } }
  );

  return true;
};

export const userMutations = {
  register,
  login,
  sendResetEmail,
  validateResetCode,
  updatePassword
};
