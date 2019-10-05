import { gql } from "apollo-server";

export const Analysis = gql`
  input AnalysisInput {
    userId: String!
    gameId: String!
    duration: Float!
    wrongCount: Int!
    correctCount: Int!
  }

  type Analysis {
    _id: ID!
    userId: String!
    gameId: String!
    date: String!
    duration: Float!
    wrongCount: Int!
    correctCount: Int!
  }

  extend type Mutation {
    createAnalysis(data: AnalysisInput!): Analysis
  }
`;
