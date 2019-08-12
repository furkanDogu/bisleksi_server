import { IFieldResolver } from "graphql-tools";

export type TResolverKind = "Query" | "Mutation";
export type TResolverObject = {
  [key in string]: IFieldResolver<any, any, any>
};
export type TComposedResolver = { [key in TResolverKind]: TResolverObject };
