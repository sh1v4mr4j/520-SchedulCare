import fetchClient from "../client";
import { ENDPOINTS } from "../endpoint";

// Update the doctor and patient details associated with a scheduled appointment
export const addAppointmentDetail = async (patientEmail, doctorEmail, date) => {
  const url = ENDPOINTS.addAppointmentDetail;
  return fetchClient(url, {
    method: "POST",
    body: JSON.stringify({
      "appointment": {
        "patient_email": patientEmail,
        "doctor_email": doctorEmail,
        "date": date
      }
    }),
  });
};
