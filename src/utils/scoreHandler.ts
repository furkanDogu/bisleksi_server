import env from "@appConfig";

export const scoreHandler = (
  scores: number[],
  currentScore: number,
  level: number
) => {
  const updatedScores = [...scores];
  const currentMaxLevel = updatedScores.length - 1;

  if (currentScore > updatedScores[level]) {
    updatedScores[level] = currentScore;
  }

  if (
    updatedScores.length <= env.max_level &&
    updatedScores[level] >= env.score_threshold &&
    level === currentMaxLevel
  ) {
    updatedScores.push(0);
  }

  return updatedScores;
};
