import mongoose from "mongoose";

import { IGame } from "@appTypes/game";

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  assets: [
    new mongoose.Schema({
      assetTag: { type: String, required: true },
      URL: { type: String, required: true },
      isActive: { type: Boolean, required: true }
    })
  ]
});

export const Game = mongoose.model<IGame>("Game", gameSchema);
