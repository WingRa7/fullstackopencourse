import { isNotNumber, stringToNum } from "./utils";

interface trainingResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface argumentsParsed {
  target: number;
  exerciseHrs: number[];
}

export const parseArguments = (args: string[]): argumentsParsed => {
  const argsStringArr = args.slice(2);

  if (argsStringArr.length < 2) throw new Error("Not enough arguments");
  if (argsStringArr.every((value) => isNotNumber(value))) {
    throw new Error("Provided values were not numbers!");
  }

  const argsNumArr = argsStringArr.map((string: string) => stringToNum(string));
  const target = argsNumArr[0];
  const exerciseHrs = argsNumArr.slice(1);

  return {
    target: target,
    exerciseHrs: exerciseHrs,
  };
};

const calculateExercises = (
  exerciseHrs: number[],
  target: number
): trainingResult => {
  const calculatePeriodLength = exerciseHrs.length;
  const calculateTrainingDays = exerciseHrs.reduce((days, hours) => {
    if (hours > 0) {
      return days + 1;
    }
    return days;
  }, 0);

  const calculateAverage = (numbers: number[]) => {
    if (numbers.length === 0) {
      return 0;
    }
    const sum = numbers.reduce((acc: number, value: number) => acc + value);
    return sum / numbers.length;
  };

  const averageHrs = calculateAverage(exerciseHrs);

  const determineSuccess = averageHrs >= target;

  const calculateRating = (hoursDoneAvrg: number, targetHours: number) => {
    const percentage = (hoursDoneAvrg / targetHours) * 100;
    if (percentage < 35) {
      return 1;
    }
    if (percentage >= 35 && percentage < 80) {
      return 2;
    }
    if (percentage >= 80) {
      return 3;
    }
    return 0;
  };
  const rating = calculateRating(averageHrs, target);
  const describeRating = (rating: number) => {
    if (rating === 1) {
      return "Not too bad, but could be better.";
    }
    if (rating === 2) {
      return "Good job, making progress!";
    }
    if (rating === 3) {
      return "You did great. Well done! Keep it up.";
    }
    return "Consistency is key";
  };
  const ratingFeedback = describeRating(rating);

  return {
    periodLength: calculatePeriodLength,
    trainingDays: calculateTrainingDays,
    success: determineSuccess,
    rating: rating,
    ratingDescription: ratingFeedback,
    target: target,
    average: averageHrs,
  };
};

try {
  const { target, exerciseHrs } = parseArguments(process.argv);
  console.log(calculateExercises(exerciseHrs, target));
} catch (error: unknown) {
  let errorMessage = "An error occurred.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
