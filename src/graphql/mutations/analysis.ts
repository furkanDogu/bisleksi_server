import { Analysis } from "@models";
import { IAnalysis } from "@appTypes/analysis";

export const analysisMutations = {
  createAnalysis: async (_: any, { data }: { data: IAnalysis }) => {
    console.log(data);
    return Analysis.create(data);
  }
};
