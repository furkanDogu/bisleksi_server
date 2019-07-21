import yup from "yup";

export const isEmailValid = async (email: string) =>
  await yup
    .string()
    .email()
    .isValid(email);

// ex: In 2019, the given birthday max should be 01.01.2012
const maxYear = new Date().getFullYear() - 7;
export const isBirthDayValid = async (birthday: Date | string) =>
  await yup
    .date()
    .max(new Date(maxYear, 0, 1))
    .isValid(birthday);
