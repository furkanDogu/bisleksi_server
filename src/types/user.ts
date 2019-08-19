export interface IRegisterUser {
  name: string;
  surname: string;
  email: string;
  password: string;
  profileName: string;
  birthday: Date;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IValidateResetCode {
  code: string;
}

export interface IUpdatePassword {
  safetyToken: string;
  newPassword: string;
}

export interface IUser extends IRegisterUser {
  _id: string;
  levels: { gameId: string; level: number }[];
  resetPasswordToken?: string;
  resetTokenExpires?: string;
}
