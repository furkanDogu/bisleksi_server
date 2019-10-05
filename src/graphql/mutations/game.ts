import { Types } from "mongoose";

import { Game } from "@models";
import { ICreateGame, IAddAsset, IToggleAssetState } from "@appTypes/game";
import { throwError } from "@services/errorService";

export const gameMutations = {
  createGame: async (_: any, { name }: ICreateGame) => {
    const game = await Game.findOne({ name });
    if (game)
      return throwError({
        from: "mutations:game:createGame",
        msg: "Given game name is duplicate, please put another name"
      });

    return Game.create({
      name,
      assets: []
    });
  },

  addAsset: async (_: any, { assetTag, URL, gameId }: IAddAsset) => {
    const game = await Game.findByIdAndUpdate(
      Types.ObjectId(gameId),
      {
        $push: { assets: { assetTag, URL, isActive: true } }
      },
      { new: true }
    );

    if (!game)
      return throwError({
        from: "mutations:game:addAsset",
        msg: "Asset couldn't be added"
      });

    return game;
  },

  toggleAssetState: async (
    _: any,
    { gameId, assetId, state }: IToggleAssetState
  ) => {
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
      return throwError({
        from: "mutations:game:addAsset",
        msg: "Asset state couldn't be toggled"
      });

    return game;
  }
};
