import { Schema } from "mongoose";

import {
  TResolverObject,
  TComposedResolver,
  TResolverKind
} from "@appTypes/common";

export const generateComposedResolverObj = (
  kind: TResolverKind,
  resolvers: { [key in string]: TResolverObject }
): TComposedResolver =>
  Object.entries(resolvers).reduce(
    (acc, curr) => {
      return {
        [kind]: {
          ...acc[kind],
          ...curr[1]
        }
      };
    },
    <any>{}
  );
