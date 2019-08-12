import {
  TResolverObject,
  TComposedResolver,
  TResolverKind
} from "@appTypes/common";

export const generateLevels = () => {
  return [{ gameId: 1, level: 1 }, { gameId: 2, level: 1 }];
};

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
