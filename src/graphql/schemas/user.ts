import { gql } from "apollo-server";

export const User = gql`
  type GameLevel {
    gameId: ID!
    level: Int!
  }

  type User {
    _id: ID!
    name: String!
    surname: String!
    email: String!
    profileName: String!
    birthday: String!
    levels: [GameLevel!]!
    createdAt: String!
    resetPasswordToken: String
    resetTokenExpires: String
  }

  extend type Query {
    sayHi(name: String!): String!
    users: [User!]!
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
