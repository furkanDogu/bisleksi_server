import { gql } from "apollo-server";

// TODO: fix game level

export const User = gql`
  type GameInfo {
    gameId: ID!
    score: Int!
  }

  type User {
    _id: ID!
    name: String!
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
    sayHi(name: String!): String!
  }

  extend type Mutation {
    register(
      name: String!
      surname: String!
      email: String!
      password: String!
      profileName: String!
      birthday: String!
    ): String
    login(email: String!, password: String!): String
    sendResetEmail(email: String!): Boolean
    validateResetCode(code: String!): String
    updatePassword(safetyToken: String!, newPassword: String!): Boolean
  }
`;
