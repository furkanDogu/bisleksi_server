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

    let { correctCount, userId, gameId, level, wrongCount } = data;
    level -= 1;

    if (
      level < 0 ||
      level > env.max_level ||
      correctCount + wrongCount > env.questionCount
    )
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

    let updatedGameInfo;
    try {
      updatedGameInfo = user.toObject().gameInfo.map((game: any) => {
        return game.gameId.toString() === gameId
          ? {
              ...game,
              scores: scoreHandler(game.scores, correctCount * 10, level)
            }
          : { ...game };
      });
      user.gameInfo = updatedGameInfo;
      await user.save();
    } catch (e) {
      return error({
        from: "mutations:analysis:createAnalysis",
        msg: "Game couldn't be found"
      });
    }
    await Analysis.create(data);

    return updatedGameInfo.find(
      (game: any) => game.gameId.toString() === gameId
    );
  }
};
