import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import env from "@appConfig";

import User from "@models/user";
import { TRegisterUserParams, TLoginUserParams } from "@appTypes/user";
import { ExistingEmail, LoginError } from "@errors/userErrors";
import { generateLevels } from "@utils/generators";

const register = async (
  _: Object,
  { name, surname, email, password, profileName, birthday }: TRegisterUserParams
) => {
  const user = await User.findOne({ email }, null, { lean: true }).exec();
  if (user) throw new Error(ExistingEmail({ from: "mutations:user:session" }));

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

  return jwt.sign(newUser, env.jwt_secret!);
};

const login = async (_: Object, { email, password }: TLoginUserParams) => {
  const userDoc = await User.findOne({ email });
  if (!userDoc) throw new Error(LoginError({ from: "mutations:user:session" }));

  const user = userDoc.toObject();

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error(LoginError({ from: "mutations:user:session" }));

  delete user.password;

  return jwt.sign(user, env.jwt_secret!);
};

export const userMutations = {
  register,
  login
};
