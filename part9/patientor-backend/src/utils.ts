import z from "zod";
import { Gender } from "./types";

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export const NewHealthCheckEntrySchema = z.object({
  type: z.literal("HealthCheck"),
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  healthCheckRating: z.number(),
});

export const NewOccupationalHealthcareEntrySchema = z.object({
  type: z.literal("OccupationalHealthcare"),
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.iso.date(),
    endDate: z.iso.date(),
  }),
});

export const NewHospitalEntrySchema = z.object({
  type: z.literal("Hospital"),
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string(),
  }),
});

export const NewEntrySchema = z.discriminatedUnion("type", [
  NewHealthCheckEntrySchema,
  NewOccupationalHealthcareEntrySchema,
  NewHospitalEntrySchema,
]);
