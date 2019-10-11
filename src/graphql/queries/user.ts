import { ExpressContext } from "apollo-server-express/dist/ApolloServer";

import { User } from "@models";
import { TUserQuery } from "@appTypes/user";

import { error } from "@services/errorService";
import _unset from "lodash/unset";
import { minRole } from "@services/authService";

// FIX ME: Leave only token check not id because there is no case for user to check another id
export const userQueries = {
  user: async (_: any, { userId }: TUserQuery, context: ExpressContext) => {
    minRole(context, "user");
    const user = await User.findById(userId);
    if (!user)
      return error({
        from: "queries:user:user",
        msg: "No user found"
      });
    _unset(user, "password");
    _unset(user, "refresh_token");

    return user.toObject();
  }
};
