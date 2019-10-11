import { makeExecutableSchema, IResolvers } from "graphql-tools";
import { gql } from "apollo-server-express";

// TYPES
import { User, Game, Analysis, Auth } from "@schemas";

// QUERIES
import { userQueries } from "@queries";

// MUTATIONS
import {
  userMutations,
  gameMutations,
  analysisMutations,
  authMutations
} from "@mutations";

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
    userMutations,
    gameMutations,
    analysisMutations,
    authMutations
  })
};

const schema = makeExecutableSchema({
  typeDefs: [Root, User, Game, Analysis, Auth],
  resolvers
});

export default schema;
