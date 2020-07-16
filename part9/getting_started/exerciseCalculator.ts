interface exerciseValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercise = (
  exerciseHours: Array<number>,
  target: number
): exerciseValues => {
  if (!target || !exerciseHours) {
    throw new Error("parameters missing");
  }
  if (!Array.isArray(exerciseHours)) {
    throw new Error("malformatted parameters");
  }

  const hasNaNInDailyHours = exerciseHours.some((hours) => isNaN(hours));
  target = Number(target);

  if (isNaN(target) || hasNaNInDailyHours) {
    throw new Error("malformatted parameters");
  }

  const totalHours = exerciseHours.reduce((acc, current) => acc + current, 0);

  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((hour) => hour !== 0).length;
  const success = totalHours > target ? true : false;
  const average = totalHours / trainingDays;
  const rating = 2;
  const ratingDescription = "not too bad but could be better";

  return {
    target,
    periodLength,
    trainingDays,
    success,
    average,
    rating,
    ratingDescription,
  };
};
