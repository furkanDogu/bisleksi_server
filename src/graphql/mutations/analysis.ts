import { ExpressContext } from "apollo-server-express/dist/ApolloServer";

import { Analysis } from "@models";
import { IAnalysis } from "@appTypes/analysis";

import { minRole } from "@services/authService";

export const analysisMutations = {
  createAnalysis: async (
    _: any,
    { data }: { data: IAnalysis },
    context: ExpressContext
  ) => {
    minRole(context, "user");

    return Analysis.create(data);
  }
};
