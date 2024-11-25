import fetchClient from "../client";
import { ENDPOINTS } from "../endpoint";

const updateLocation = async (url, email, location) => {
  return fetchClient(url, {
    method: "POST",
    body: JSON.stringify({ email, location }),
  });
};

export const updatePatientLocation = async (email, location) => {
  try {
    const url = ENDPOINTS.setPatientLocation;
    return updateLocation(url, email, location);
  } catch (error) {
    console.error("Error updating location:", error.message);
    throw error;
  }
};

export const updateDoctorLocation = async (email, location) => {
  try {
    const url = ENDPOINTS.setDoctorLocation;
    return updateLocation(url, email, location);
  } catch (error) {
    console.error("Error updating location:", error.message);
    throw error;
  }
};
