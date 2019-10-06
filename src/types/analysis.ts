import { Document } from "mongoose";

import { IUser } from "./user";
import { IGame } from "./game";

export interface IAnalysis extends Document {
  userId: IUser["_id"];
  gameId: IGame["_id"];
  level: number;
  date: Date;
  duration: number;
  wrongCount: number;
  correctCount: number;
}
