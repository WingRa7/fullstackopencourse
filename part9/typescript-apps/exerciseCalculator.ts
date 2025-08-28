interface trainingResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

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

const exerciseHours = [3, 0, 2, 4.5, 0, 3, 1];
const targetHours = 2;

console.log(calculateExercises(exerciseHours, targetHours));
