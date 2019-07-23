import { gql } from "apollo-server";
const User = gql`
  type GameLevel {
    game_id: ID!
    level: Int!
  }

  type User {
    id: ID!
    name: String!
    surname: String!
    email: String!
    password: String!
    profileName: String!
    birthday: String!
    levels: [GameLevel!]!
    createdAt: String!
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
    ): User!
  }
`;

export default User;
