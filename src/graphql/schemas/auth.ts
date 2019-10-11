import { gql } from "apollo-server";

export const Auth = gql`
  type AuthPayload {
    accessToken: String!
    refreshToken: String!
  }

  extend type Mutation {
    register(
      name: String!
      surname: String!
      email: String!
      password: String!
      profileName: String!
      birthday: String!
    ): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    newAccessToken(refreshToken: String!): String
    logout(userId: String!): Boolean
  }
`;
