import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  assetURLs: [
    {
      assetName: { type: String, required: true },
      URL: { type: String, required: true }
    }
  ]
});

export default mongoose.model("Game", gameSchema);
