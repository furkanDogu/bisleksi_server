import mongoose, { Schema } from "mongoose";

import { IAnalysis } from "@appTypes/analysis";

const analysisSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  gameId: {
    type: Schema.Types.ObjectId,
    ref: "Game",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  duration: {
    type: Number,
    required: true
  },
  wrongCount: {
    type: Number,
    required: true
  },
  correctCount: {
    type: Number,
    required: true
  }
});

export const Analysis = mongoose.model<IAnalysis>("Analysis", analysisSchema);
