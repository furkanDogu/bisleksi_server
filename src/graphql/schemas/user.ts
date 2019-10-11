import { gql } from "apollo-server";

export const User = gql`
  type GameInfo {
    gameId: ID!
    scores: [Int!]!
  }

  type User {
    _id: ID!
    name: String!
    role: String!
    surname: String!
    email: String!
    profileName: String!
    birthday: String!
    gameInfo: [GameInfo!]!
    createdAt: String!
    resetPasswordToken: String
    resetTokenExpires: String
  }

  extend type Query {
    user(userId: String!): User
  }

  extend type Mutation {
    sendResetEmail(email: String!): Boolean
    validateResetCode(code: String!): String
    updatePassword(safetyToken: String!, newPassword: String!): Boolean
  }
`;
