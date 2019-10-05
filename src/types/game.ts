import { Document } from "mongoose";

export interface IGame extends Document {
  name: string;
  assets: [IAsset];
}

export interface IAsset extends Document {
  assetTag: string;
  URL: string;
  isActive: boolean;
}

export interface ICreateGame {
  name: IGame["name"];
}

export interface IAddAsset {
  gameId: IGame["_id"];
  assetTag: IAsset["assetTag"];
  URL: IAsset["URL"];
}

export interface IToggleAssetState {
  assetId: IAsset["_id"];
  gameId: IGame["_id"];
  state: boolean;
}
