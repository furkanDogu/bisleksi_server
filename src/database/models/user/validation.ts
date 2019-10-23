import * as yup from "yup";

import ageCalculator from "@utils/ageCalculator";

export const isEmailValid = async (email: string) =>
  yup
    .string()
    .email()
    .isValid(email);

export const isBirthDayValid = async (birthday: Date | string) =>
  yup
    .date()
    .test(
      "is-over-7",
      "Min age should be 7",
      (birthday: string) => ageCalculator(birthday as string) >= 7
    )
    .isValid(birthday);
