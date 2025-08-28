const calculateBmi = (heightcm: number, weightkg: number) => {
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
    return "Overwegiht (Pre-obese)";
  }
  if (bmi >= 30 && bmi < 35) {
    return "Overweight (Class I)";
  }
  if (bmi >= 35 && bmi < 40) {
    return "Overweight (Class II)";
  }
  if (bmi >= 40) {
    return "Overweight (Class III";
  }
};

console.log(calculateBmi(180, 74));
