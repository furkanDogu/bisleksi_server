import { TRegisterUserParams } from "@appTypes/user";
import User from "@db_modules/user";
import { ExistingEmail } from "@errors/userErrors";

export const register = async (_: Object, args: TRegisterUserParams) => {
  const { name, surname, email, password, profileName, birthday } = args;
  const user = await User.findOne({ email }, null, { lean: true }).exec();

  if (user) throw new Error(JSON.stringify(ExistingEmail()));

  // generate levels and add to the create function
  User.create({
    name,
    surname,
    email,
    password,
    profileName,
    birthday
  });

  // temporary
  return {
    id: "1",
    name: "furkan",
    surname: "dogu",
    email: "furkandogu@gmail.com",
    password: "123",
    profileName: "Furkan35",
    birthday: "2019-06-04"
  };
};

export default {
  Mutation: {
    register
  }
};
