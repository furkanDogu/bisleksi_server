import bcrypt from "bcrypt";
import { verify } from "jsonwebtoken";
import { Router } from "express";

import { IRegisterUser, ILoginUser, TTokenPayload } from "@appTypes/user";
import { User, Game } from "@models";

import env from "@appConfig";
import { error } from "@services/errorService";
import { createToken } from "@services/authService";

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

    const refresh_token = createToken({ userId: _id }, env.refreshTokenExp);
    await User.findOneAndUpdate(
      { _id },
      {
        refresh_token
      }
    );

    return {
      refresh_token,
      access_token: createToken({ userId: _id, role }, env.accessTokenExp)
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

    const refresh_token = createToken({ userId }, env.refreshTokenExp);
    user.set("refresh_token", refresh_token);
    await user.save();

    return {
      refresh_token,
      access_token: createToken({ userId, role: user.role }, env.accessTokenExp)
    };
  },

  logout: async (_: any, { userId }: { userId: string }) => {
    const user = await User.findByIdAndUpdate(userId, {
      refresh_token: null
    });

    if (!user)
      return error({
        from: "mutations:auth:logout",
        msg: "Error while logging out"
      });

    return true;
  }
};

const router = Router();
router.get("/newAccessToken", async (req, res) => {
  const refresh_token = req.headers["refresh_token"];

  if (!refresh_token) return res.status(401).send({ access_token: "" });

  let decodedRefreshToken;
  try {
    decodedRefreshToken = verify(<string>refresh_token, env.jwt_secret);
  } catch (e) {
    return res.status(401).send({ access_token: "" });
  }

  const user = await User.findById((<TTokenPayload>decodedRefreshToken).userId);
  if (!user) {
    console.log(<TTokenPayload>decodedRefreshToken);
    console.log("here 1");
    return res.status(401).send({ access_token: "" });
  }
  if (user.refresh_token !== refresh_token) {
    console.log("here 2");
    return res.status(401).send({ access_token: "" });
  }

  return res.status(200).send({
    access_token: createToken(
      {
        userId: user._id,
        role: user.role
      },
      env.accessTokenExp
    )
  });
});

export default router;
