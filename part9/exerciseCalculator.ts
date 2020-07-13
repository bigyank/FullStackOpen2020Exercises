interface exerciseValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface terminalValues {
  exerciseHours: Array<number>;
  target: number;
}

const parseTerminal = (args: Array<string>): terminalValues => {
  if (args.length < 10) throw new Error("Not enough arguments");
  if (args.length > 10) throw new Error("Too many arguments");

  const exerciseHours = args.slice(2, 9).map((value) => Number(value));
  const target = Number(args.slice(9));

  const isValidHours = exerciseHours.every((hour) => !isNaN(hour));

  if (!isValidHours || isNaN(target)) {
    throw new Error("invalid arguments");
  }

  return {
    exerciseHours,
    target,
  };
};

const calculateExercise = (
  exerciseHours: Array<number>,
  target: number
): exerciseValues => {
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

try {
  const { exerciseHours, target } = parseTerminal(process.argv);
  console.log(calculateExercise(exerciseHours, target));
} catch (e) {
  console.log("something went wrong:", e.message);
}
