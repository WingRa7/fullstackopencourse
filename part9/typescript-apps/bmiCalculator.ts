interface HeightWeight {
  height: number;
  weight: number;
}

export const parseArguments = (args: string[]): HeightWeight => {
  if (args.length < 4)
    throw new Error("Not enough arguments (should be height(cm) / weight(kg)");
  if (args.length > 4)
    throw new Error("Too many arguments (should be height(cm) / weight(kg)");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (heightcm: number, weightkg: number) => {
  const heightm = heightcm / 100;
  const heightsq = heightm * heightm;
  const bmi = weightkg / heightsq;

  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  }
  if (bmi >= 16 && bmi < 17) {
    return "Underweight (Moderate thinness";
  }
  if (bmi >= 17 && bmi < 18.5) {
    return "Underweight (Mild thinness)";
  }
  if (bmi >= 18.5 && bmi < 25) {
    return "Normal range";
  }
  if (bmi >= 25 && bmi < 30) {
    return "Overweight (Pre-obese)";
  }
  if (bmi >= 30 && bmi < 35) {
    return "Overweight (Class I)";
  }
  if (bmi >= 35 && bmi < 40) {
    return "Overweight (Class II)";
  }
  if (bmi >= 40) {
    return "Overweight (Class III)";
  }
  return "BMI not found";
};

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log("BMI:", calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "An error occurred.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
