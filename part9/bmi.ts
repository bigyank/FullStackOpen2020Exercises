type bmi = (mass: any, height: number) => string;

interface parsedValues {
  mass: number;
  height: number;
}

const parseArgs = (args: Array<string>): parsedValues => {
  if (args.length !== 4) throw new Error("improper amount of arguments");

  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error("invalid arguments");
  }

  return { mass: Number(args[2]), height: Number(args[3]) };
};

const calculateBMI: bmi = (mass, height) => {
  const bmi = mass / Math.pow(height, 2);
  switch (true) {
    case bmi <= 16:
      return "Very severely underweight";
    case bmi <= 18.5:
      return "Severely underweight ";
    case bmi <= 25:
      return "Normal (healthy weight) ";
    case bmi <= 30:
      return "Overweight";
    case bmi <= 35:
      return "Obese Class I (Moderately obese) ";
    case bmi <= 40:
      return "Obese Class II (Severely obese) ";
    default:
      return "Obese Class III (Very severely obese) ";
  }
};

try {
  const { mass, height } = parseArgs(process.argv);
  console.log(calculateBMI(mass, height));
} catch (e) {
  console.log("something went wrong: ", e.message);
}
