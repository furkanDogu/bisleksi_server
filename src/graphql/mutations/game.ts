import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { Types } from "mongoose";

import { Game } from "@models";
import { ICreateGame, IAddAsset, IToggleAssetState } from "@appTypes/game";

import { error } from "@services/errorService";
import { minRole } from "@services/authService";

export const gameMutations = {
  createGame: async (
    _: any,
    { name }: ICreateGame,
    context: ExpressContext
  ) => {
    minRole(context, "admin");

    const game = await Game.findOne({ name });
    if (game)
      return error({
        from: "mutations:game:createGame",
        msg: "Given game name is duplicate, please put another name"
      });

    return Game.create({
      name,
      assets: []
    });
  },

  addAsset: async (
    _: any,
    { assetTag, URL, gameId }: IAddAsset,
    context: ExpressContext
  ) => {
    minRole(context, "admin");

    const game = await Game.findByIdAndUpdate(
      Types.ObjectId(gameId),
      {
        $push: { assets: { assetTag, URL, isActive: true } }
      },
      { new: true }
    );

    if (!game)
      return error({
        from: "mutations:game:addAsset",
        msg: "Asset couldn't be added"
      });

    return game;
  },

  toggleAssetState: async (
    _: any,
    { gameId, assetId, state }: IToggleAssetState,
    context: ExpressContext
  ) => {
    minRole(context, "admin");

    const game = await Game.findOneAndUpdate(
      {
        _id: Types.ObjectId(gameId),
        assets: {
          $elemMatch: {
            _id: Types.ObjectId(assetId)
          }
        }
      },
      { $set: { "assets.$.isActive": state } },
      { new: true }
    );

    if (!game)
      return error({
        from: "mutations:game:addAsset",
        msg: "Asset state couldn't be toggled"
      });

    return game;
  }
};
