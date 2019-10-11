import { ExpressContext } from "apollo-server-express/dist/ApolloServer";

import { Analysis, User } from "@models";
import { IAnalysis } from "@appTypes/analysis";

import { minRole } from "@services/authService";
import { error } from "@services/errorService";
import { scoreHandler } from "@utils/scoreHandler";
import env from "@appConfig";

export const analysisMutations = {
  createAnalysis: async (
    _: any,
    { data }: { data: IAnalysis },
    context: ExpressContext
  ) => {
    minRole(context, "user");

    const { correctCount, userId, gameId, level, wrongCount } = data;

    if (level > env.max_level || correctCount + wrongCount > env.questionCount)
      return error({
        from: "mutations:analysis:createAnalysis",
        msg: "Invalid game analysis"
      });

    const user = await User.findById(userId);
    if (!user)
      return error({
        from: "mutations:analysis:createAnalysis",
        msg: "User couldn't be found"
      });

    try {
      const test = user.toObject().gameInfo.map((game: any) =>
        game.gameId.toString() === gameId
          ? {
              ...game,
              scores: scoreHandler(game.scores, correctCount * 10, level)
            }
          : { ...game }
      );
      user.gameInfo = test;
      await user.save();
    } catch (e) {
      return error({
        from: "mutations:analysis:createAnalysis",
        msg: "Game couldn't be found"
      });
    }
    await Analysis.create(data);

    return user
      .toObject()
      .gameInfo.find((game: any) => game.gameId.toString() === gameId);
  }
};
