import { Schema, Document } from "mongoose";

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
  gameInfo: { game: IGame["_id"]; score: number }[];
  createdAt: Date;
  resetPasswordToken?: string;
  resetTokenExpires?: string;
}
