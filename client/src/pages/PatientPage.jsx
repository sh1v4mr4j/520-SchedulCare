import React, { useState} from "react";
import PatientForm from "../components/PatientForm";
import Heading from "../components/Heading";
import { usePatientByEmail } from "../hooks/usePatientByEmail";
import ErrorModal from "../components/ErrorModal";


const PatientPage = () => {
  const email = "logan.anderson@example.com";
  const {data, loading, error} = usePatientByEmail(email);
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
    {error && (
        <ErrorModal 
          isOpen={isModalOpen} 
          onClose={() => setModalOpen(false)} 
          errorMessage={error} 
        />
      )}
      
      {!error && (
        <>
          <Heading heading="Patient Form" />
          <PatientForm loading={loading} patientData={data} />
        </>
      )}
    </>
  );
};

export default PatientPage;
