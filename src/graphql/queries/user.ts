import { User } from "@models";
import { TUserQuery } from "@appTypes/user";

import { error } from "@services/errorService";
import _unset from "lodash/unset";

export const userQueries = {
  user: async (_: any, { userId }: TUserQuery) => {
    const user = await User.findById(userId);
    if (!user)
      return error({
        from: "queries:user:user",
        msg: "No user found"
      });
    _unset(user, "password");
    _unset(user, "refreshToken");

    return user.toObject();
  }
};
