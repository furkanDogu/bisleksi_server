import { merge } from "lodash";
import { makeExecutableSchema, IResolvers } from "graphql-tools";
import { gql } from "apollo-server";

// QUERIES
import userQueries from "./graphql_types/user/queries";

// TYPES
import User from "./graphql_types/user/schema";

const Root = gql`
  type Query {
    _dummy: String
  }
  type Mutation {
    _dummy: String
  }
  type Subscription {
    _dummy: String
  }
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

const resolvers: IResolvers = merge({}, userQueries);
const schema = makeExecutableSchema({
  typeDefs: [Root, User],
  resolvers
});

export default schema;
