import fetchClient from "../client";
import { ENDPOINTS } from "../endpoints";

export const getDoctorsByPincode = async (pincode) => {
  const url = ENDPOINTS.getDoctorsByPincode(pincode);
  return fetchClient(url);
};

export const addDoctor = async (doctorData) => {
  const url = ENDPOINTS.addDoctor;
  return fetchClient(url, {
    method: "POST",
    body: JSON.stringify(doctorData),
  });
};
