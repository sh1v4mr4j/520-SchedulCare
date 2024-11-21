import React from "react";
import PatientForm from "../components/patientForm";
import Heading from "../components/Heading";

const PatientPage = () => {
  return (
    <>
      <Heading heading="Patient Form" />
      <PatientForm />
    </>
  );
};

export default PatientPage;
