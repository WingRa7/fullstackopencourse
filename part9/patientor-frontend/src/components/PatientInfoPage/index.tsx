import {
  Diagnosis,
  Patient,
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from "../../types";
import {
  BriefcaseMedical,
  HeartPulse,
  Hospital,
  Mars,
  Venus,
  HeartCrack,
  HeartMinus,
  Heart,
  HeartPlus,
  HeartOff,
} from "lucide-react";
import { Button } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";

const infoStyle = {
  background: "#f8f8f8",
  borderStyle: "solid",
  borderRadius: 10,
  padding: 10,
  marginBottom: 10,
};

const padding = {
  paddingLeft: 2,
  paddingRight: 2,
};

interface PatientInfoProps {
  diagnoses: Diagnosis[];
}

const PatientInfoPage = ({ diagnoses }: PatientInfoProps) => {
  const [patient, setPatient] = useState<Patient | null>(null);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        const patient = await patientService.getById(id);
        setPatient(patient);
      };
      void fetchPatient();
    }
  }, [id]);

  const findDiagnosis = (code: string): string | null => {
    const diagnosis = diagnoses.find((diagnosis) => code === diagnosis.code);
    if (diagnosis) {
      return diagnosis.name;
    }
    return null;
  };

  interface HealthCheckRatingProps {
    rating: number;
  }

  const HealthCheckRating = ({ rating }: HealthCheckRatingProps) => {
    switch (rating) {
      case 3:
        return <HeartCrack color="#d32f2f" />;
      case 2:
        return <HeartMinus color="#f57c00" />;
      case 1:
        return <Heart color="#fbc02d" />;
      case 0:
        return <HeartPlus color="#388e3c" />;
      default:
        return <HeartOff />;
    }
  };

  interface HospitalEntryProps {
    entry: HospitalEntry;
  }

  const HospitalEntry = ({ entry }: HospitalEntryProps) => {
    return (
      <div>
        <div>
          {entry.date}
          <Hospital size="20" style={padding} />
        </div>
        <div>
          <p>
            <i>{entry.description}</i>
          </p>
        </div>
        <div>
          <p>diagnose by {entry.specialist}</p>
          {entry.discharge.date} {entry.discharge.criteria}
        </div>
      </div>
    );
  };

  interface OccupationalHealthEntryProps {
    entry: OccupationalHealthcareEntry;
  }

  const OccupationalHealth = ({ entry }: OccupationalHealthEntryProps) => {
    return (
      <div>
        <div>
          {entry.date}
          <BriefcaseMedical size="20" style={padding} />
          <i>
            <strong>{entry.employerName}</strong>
          </i>
        </div>
        <div>
          <p>
            <i>{entry.description}</i>
          </p>
        </div>
        <div>
          <p></p>diagnose by {entry.specialist}
        </div>
        <div>
          {entry.sickLeave && (
            <div>
              <p>
                <strong>Sick Leave start: </strong>
                {entry.sickLeave?.startDate}
              </p>
              <p>
                <strong>Sick leave end: </strong>
                {entry.sickLeave?.endDate}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  interface HealthCheckEntryProps {
    entry: HealthCheckEntry;
  }

  const HealthCheck = ({ entry }: HealthCheckEntryProps) => {
    return (
      <div>
        <div>
          {entry.date}
          <HeartPulse size="20" style={padding} />
        </div>

        <div>
          <p>
            <i>{entry.description}</i>
          </p>
        </div>
        <div>
          <HealthCheckRating rating={entry.healthCheckRating} />
        </div>
        <div>
          <p></p>diagnose by {entry.specialist}
        </div>
      </div>
    );
  };

  const assertNever = (value: never): never => {
    throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
  };

  interface EntryDetailsProps {
    entry: Entry;
  }

  const EntryDetails = ({ entry }: EntryDetailsProps) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntry entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealth entry={entry} />;
      case "HealthCheck":
        return <HealthCheck entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  if (patient) {
    return (
      <div style={{ marginTop: "1em" }}>
        <div>
          <h2>
            {patient?.name} {patient.gender === "male" && <Mars />}
            {patient.gender === "female" && <Venus />}
          </h2>
          <p>ssh: {patient?.ssn}</p>
          <p>occupation: {patient?.occupation}</p>
        </div>
        <div>
          <h2>entries</h2>
          {patient.entries.map((entry) => {
            return (
              <div style={infoStyle}>
                <EntryDetails key={entry.id} entry={entry} />
                <ul>
                  {entry.diagnosisCodes?.map((code) => {
                    return (
                      <li key={code}>
                        {code} {findDiagnosis(code)}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        <Button component={Link} to="/" variant="contained" color="primary">
          Add New Entry
        </Button>
      </div>
    );
  }
  return (
    <div style={{ marginTop: "1em" }}>
      <h2>Missing Patient Info</h2>
    </div>
  );
};

export default PatientInfoPage;
