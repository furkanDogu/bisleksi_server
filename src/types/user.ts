import { Document } from "mongoose";

import { IGame } from "./game";

export interface IRegisterUser {
  name: string;
  surname: string;
  email: string;
  password: string;
  profileName: string;
  birthday: Date;
}

export interface ILoginUser {
  email: IUser["email"];
  password: IUser["password"];
}

export interface IValidateResetCode {
  code: string;
}

export interface IUpdatePassword {
  safetyToken: string;
  newPassword: string;
}

export interface IUser extends IRegisterUser, Document {
  gameInfo: { gameId: IGame["_id"]; scores: number[] }[];
  createdAt: Date;
  resetPasswordToken?: string;
  resetTokenExpires?: string;
  refresh_token?: string;
  role: string;
}

export type TRoles = "admin" | "user";

export const ROLE_VALUES: { [key in TRoles]: number } = {
  user: 0,
  admin: 1
};

export type TTokenPayload = {
  role: TRoles;
  userId: string;
};

export type TUserQuery = {
  userId: string;
};
