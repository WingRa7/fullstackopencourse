import { Patient } from "../../types";
import { Mars, Venus } from "lucide-react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";

const PatientInfoPage = () => {
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

  if (patient) {
    return (
      <div style={{ marginTop: "1em" }}>
        <h2>
          {patient?.name} {patient.gender === "male" && <Mars />}
          {patient.gender === "female" && <Venus />}
        </h2>
        <p>ssh: {patient?.ssn}</p>
        <p>occupation: {patient?.occupation}</p>
      </div>
    );
  }
  return <div>Missing Patient Info</div>;
};

export default PatientInfoPage;
