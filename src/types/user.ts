export type TRegisterUserParams = {
  name: string;
  surname: string;
  email: string;
  password: string;
  profileName: string;
  birthday: Date;
};

export type TLoginUserParams = {
  email: string;
  password: string;
};
