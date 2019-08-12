import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "@db_modules/user";
import { TRegisterUserParams, TLoginUserParams } from "@appTypes/user";
import { ExistingEmail, LoginError } from "@errors/userErrors";
import { generateLevels } from "@utils/generators";
import { JWT_SECRET } from "@appConfig";

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

  return jwt.sign(newUser, JWT_SECRET);
};

const login = async (_: Object, { email, password }: TLoginUserParams) => {
  const userDoc = await User.findOne({ email });
  if (!userDoc) throw new Error(LoginError({ from: "mutations:user:session" }));

  const user = userDoc.toObject();
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) throw new Error(LoginError({ from: "mutations:user:session" }));

  delete user.password;

  return jwt.sign(user, JWT_SECRET);
};

export const userMutations = {
  register,
  login
};
