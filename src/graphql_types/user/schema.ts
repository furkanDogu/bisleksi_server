import { gql } from "apollo-server";
const User = gql`
  type GameLevel {
    id: ID!
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
  }

  extend type Query {
    sayHi(name: String!): String!
    users: [User!]!
  }
`;

export default User;
