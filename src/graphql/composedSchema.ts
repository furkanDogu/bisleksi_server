import { makeExecutableSchema, IResolvers } from "graphql-tools";
import { gql } from "apollo-server";

// TYPES
import { User, Game, Analysis } from "@schemas";

// QUERIES
import { userQueries } from "@queries";

// MUTATIONS
import { userMutations, gameMutations, analysisMutations } from "@mutations";

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
    analysisMutations
  })
};

const schema = makeExecutableSchema({
  typeDefs: [Root, User, Game, Analysis],
  resolvers
});

export default schema;
