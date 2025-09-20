import z from "zod";

import express from "express";
import { Request, Response, NextFunction } from "express";

import patientService from "../services/patientService";
import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from "../types";
import { NewPatientSchema, NewEntrySchema } from "../utils";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res: Response<Patient>) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientSchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
  }
);

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post(
  "/:id/entries",
  newEntryParser,
  (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry>) => {
    const addedEntry = patientService.addEntry(req.body, req.params.id);
    if (addedEntry) {
      res.send(addedEntry);
    } else {
      res.sendStatus(500);
    }
  }
);

router.use(errorMiddleware);

export default router;
