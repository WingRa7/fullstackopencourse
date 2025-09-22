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
  description: z.string().min(1, "Description cannot be empty"),
  date: z.iso.date("Bad Entry Date"),
  specialist: z.string().min(1, "Specialist cannot be empty"),
  diagnosisCodes: z.array(z.string()).optional(),
  healthCheckRating: z.number(),
});

export const NewOccupationalHealthcareEntrySchema = z.object({
  type: z.literal("OccupationalHealthcare"),
  description: z.string().min(1, "Description cannot be empty"),
  date: z.iso.date("Bad Entry date"),
  specialist: z.string().min(1, "Specialist cannot be empty"),
  diagnosisCodes: z.array(z.string()).optional(),
  employerName: z.string().min(1, "Employer cannot be empty"),
  sickLeave: z.object({
    startDate: z.iso.date("Bad Sick Leave Start Date"),
    endDate: z.iso.date("Bad Sick Leave End Date"),
  }),
});

export const NewHospitalEntrySchema = z.object({
  type: z.literal("Hospital"),
  description: z.string().min(1, "Description cannot be empty"),
  date: z.iso.date("Bad Entry Date"),
  specialist: z.string().min(1, "Specialist cannot be empty"),
  diagnosisCodes: z.array(z.string()).optional(),
  discharge: z.object({
    date: z.iso.date("Bad Discharge Date"),
    criteria: z.string(),
  }),
});

export const NewEntrySchema = z.discriminatedUnion("type", [
  NewHealthCheckEntrySchema,
  NewOccupationalHealthcareEntrySchema,
  NewHospitalEntrySchema,
]);
