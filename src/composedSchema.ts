// QUERIES
import { userQueries } from "@queries/";

// TYPES
import { User } from "@schemas/index";

// MUTATIONS
import { userMutations } from "@mutation/";

import { merge } from "lodash";
import { makeExecutableSchema, IResolvers } from "graphql-tools";
import { gql } from "apollo-server";

import { generateComposedResolverObj } from "@utils/generators";

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

const resolvers: IResolvers = {
  ...generateComposedResolverObj("Query", {
    userQueries
  }),
  ...generateComposedResolverObj("Mutation", {
    userMutations
  })
};

console.log(resolvers);

const schema = makeExecutableSchema({
  typeDefs: [Root, User],
  resolvers
});

export default schema;
