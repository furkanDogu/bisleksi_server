import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";

import {
  IRegisterUser,
  ILoginUser,
  INewAccessToken,
  TTokenPayload
} from "@appTypes/user";
import { User, Game } from "@models";

import env from "@appConfig";
import { error } from "@services/errorService";
import { createToken, minRole } from "@services/authService";

export const authMutations = {
  register: async (
    _: any,
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
      scores: [0]
    }));

    const { role, _id } = await User.create({
      name,
      surname,
      email,
      profileName,
      birthday,
      gameInfo,
      password: await bcrypt.hash(password, 11)
    });

    const refreshToken = createToken({ userId: _id }, env.refreshTokenExp);
    await User.findOneAndUpdate(
      { _id },
      {
        refreshToken
      }
    );

    return {
      refreshToken,
      accessToken: createToken({ userId: _id, role }, env.accessTokenExp)
    };
  },

  login: async (_: any, { email, password }: ILoginUser) => {
    const user = await User.findOne({ email });
    if (!user)
      return error({
        from: "mutations:user:login",
        msg: "Email or password is incorrect "
      });

    if (!(await bcrypt.compare(password, user.password)))
      return error({
        from: "mutations:user:login",
        msg: "Email or password is incorrect "
      });

    const userId = user._id;

    const refreshToken = createToken({ userId }, env.refreshTokenExp);
    user.set("refreshToken", refreshToken);
    await user.save();

    return {
      refreshToken,
      accessToken: createToken({ userId, role: user.role }, env.accessTokenExp)
    };
  },
  newAccessToken: async (_: any, { refreshToken }: INewAccessToken) => {
    let userId;
    jwt.verify(refreshToken, env.jwt_secret, (err, decoded) => {
      if (err) {
        return error({
          from: "mutations:auth:newAccessToken",
          msg: "Invalid refresh token"
        });
      }
      userId = (<TTokenPayload>decoded).userId;
    });

    const user = await User.findById(userId);
    if (!user) {
      return error({
        from: "mutations:auth:newAccessToken",
        msg: "Invalid refresh token"
      });
    }
    if (user.refreshToken !== refreshToken) {
      return error({
        from: "mutations:auth:newAccessToken",
        msg: "Invalid refresh token"
      });
    }
    return createToken(
      {
        userId,
        role: user.role
      },
      env.accessTokenExp
    );
  },
  logout: async (_: any, { userId }: { userId: string }) => {
    const user = await User.findByIdAndUpdate(userId, {
      refreshToken: null
    });

    if (!user)
      return error({
        from: "mutations:auth:logout",
        msg: "Error while logging out"
      });

    return true;
  }
};
