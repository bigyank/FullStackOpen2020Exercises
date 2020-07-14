// eslint-disable-next-line @typescript-eslint/no-explicit-any
type bmi = (querymass: any, queryheight: any) => string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type parser = (mass: any, height: any) => parsedValues;

interface parsedValues {
  mass: number;
  height: number;
}

const parseArgs: parser = (mass, height) => {
  if (!mass || !height) throw new Error("required fields missing");

  if (isNaN(Number(mass)) || isNaN(Number(height))) {
    throw new Error("invalid arguments");
  }

  return { mass: Number(mass), height: Number(height) };
};

export const calculateBMI: bmi = (querymass, queryheight) => {
  const { mass, height } = parseArgs(querymass, queryheight);
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
