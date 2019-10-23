import { gql } from "apollo-server-express";

export const Auth = gql`
  type AuthPayload {
    access_token: String!
    refresh_token: String!
  }

  extend type Mutation {
    register(
      name: String!
      surname: String!
      email: String!
      password: String!
      birthday: String!
    ): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    logout(userId: String!): Boolean
  }
`;
