import { useState, SyntheticEvent } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from "@mui/material";

import { HealthCheckRating, EntryFormValues, Diagnosis } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[];
}

interface HealthCheckRatingOption {
  value: number;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(
  HealthCheckRating
)
  .filter((value) => typeof value === "number")
  .map((value) => ({
    value: value,
    label: value.toString(),
  }));

interface DiagnosisCodeOption {
  value: string;
  label: string;
}

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [entryType, setEntryType] = useState("");

  // BaseEntry
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  // HealthCheckEntry
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );

  // OccupationalHealthcareEntry
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  // HospitalEntry
  const [dischargeDate, setDischargeDate] = useState("");
  const [criteria, setCriteria] = useState("");

  const diagnosisCodeOptions: DiagnosisCodeOption[] = diagnoses
    .map((diagnosis) => diagnosis.code)
    .map((value) => ({
      value: value,
      label: value.toString(),
    }));

  const entryTypeOptions = ["Health Check", "Occupational Health", "Hospital"];

  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const value = event.target.value;

    if (entryTypeOptions.includes(value)) {
      setEntryType(value);
    }
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const value = Number(event.target.value);

    if (Object.values(HealthCheckRating).includes(value)) {
      setHealthCheckRating(value as HealthCheckRating);
    }
  };

  const onDiagnosisCodeChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    const value = event.target.value;
    if (Array.isArray(value)) {
      setDiagnosisCodes(value);
    } else {
      setDiagnosisCodes([value]);
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (entryType === "Health Check") {
      onSubmit({
        description,
        date,
        specialist,
        healthCheckRating,
        diagnosisCodes,
        type: "HealthCheck",
      });
    }
    if (entryType === "Occupational Health") {
      onSubmit({
        description,
        date,
        specialist,
        diagnosisCodes,
        employerName,
        sickLeave: {
          startDate: sickLeaveStartDate,
          endDate: sickLeaveEndDate,
        },
        type: "OccupationalHealthcare",
      });
    }
    if (entryType === "Hospital") {
      onSubmit({
        description,
        date,
        specialist,
        diagnosisCodes,
        discharge: {
          date: dischargeDate,
          criteria: criteria,
        },
        type: "Hospital",
      });
    }
  };

  return (
    <div>
      <div>
        <InputLabel>Entry Type</InputLabel>
        <Select
          style={{ marginBottom: 20 }}
          label="Entry Type"
          fullWidth
          value={entryType}
          onChange={onEntryTypeChange}
        >
          {entryTypeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
      <form onSubmit={addEntry}>
        <TextField
          style={{ marginBottom: 10 }}
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          style={{ marginBottom: 10, marginTop: 10 }}
          label="Date"
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          style={{ marginBottom: 10 }}
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel>Diagnosis Codes</InputLabel>
        <Select
          style={{ marginBottom: 10 }}
          label="Diagnosis Codes"
          fullWidth
          value={diagnosisCodes}
          onChange={onDiagnosisCodeChange}
          multiple
        >
          {diagnosisCodeOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {entryType === "Health Check" && (
          <>
            <InputLabel style={{ marginTop: 20 }}>
              Health Check Rating
            </InputLabel>
            <Select
              style={{ marginBottom: 10 }}
              label="Health Check Rating"
              fullWidth
              value={healthCheckRating.toString()}
              onChange={onHealthCheckRatingChange}
            >
              {healthCheckRatingOptions.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
        {entryType === "Occupational Health" && (
          <>
            <TextField
              style={{ marginBottom: 10 }}
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <InputLabel>Sick Leave</InputLabel>
            <TextField
              style={{ marginBottom: 10, marginTop: 10 }}
              label="Start Date"
              type="date"
              fullWidth
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              style={{ marginBottom: 10, marginTop: 10 }}
              label="End Date"
              type="date"
              fullWidth
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </>
        )}
        {entryType === "Hospital" && (
          <>
            <InputLabel>Discharge</InputLabel>
            <TextField
              style={{ marginBottom: 10, marginTop: 10 }}
              label="Discharge Date"
              type="date"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              style={{ marginBottom: 10, marginTop: 10 }}
              label="Criteria"
              fullWidth
              value={criteria}
              onChange={({ target }) => setCriteria(target.value)}
            />
          </>
        )}

        <Grid style={{ marginTop: 10 }}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
