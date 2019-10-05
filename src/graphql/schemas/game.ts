import { gql } from "apollo-server";

export const Game = gql`
  type Asset {
    _id: ID!
    assetTag: String!
    URL: String!
    isActive: Boolean!
  }
  type Game {
    _id: ID!
    name: String!
    assets: [Asset!]!
  }
  extend type Mutation {
    createGame(name: String!): Game
    addAsset(gameId: String!, assetTag: String!, URL: String!): Game
    toggleAssetState(gameId: String!, assetId: String!, state: Boolean): Game
  }
`;
