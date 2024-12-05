import fetchClient from "../client";
import { ENDPOINTS } from "../endpoint";

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
