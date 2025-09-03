import express from "express";
// const express = require("express");
import { isNotNumber } from "./utils";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  if (
    !req.query.height ||
    !req.query.weight ||
    isNotNumber(req.query.height) ||
    isNotNumber(req.query.weight)
  ) {
    res.status(400).send({ error: "malformatted parameters" });
  } else {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    const bmi = calculateBmi(height, weight);

    res.status(200).json({ weight: weight, height: height, bmi: bmi });
  }
});

app.post("/exercises", (req, res) => {
  if (!req.body.daily_exercises || !req.body.target) {
    return res.status(400).send({ error: "parameters missing" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const exercises: number[] = req.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const target: number = req.body.target;

  if (
    isNotNumber(req.body.target) ||
    !Array.isArray(req.body.daily_exercises) ||
    exercises.some((value) => isNotNumber(value))
  ) {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const result = calculateExercises(exercises, target);
  return res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
