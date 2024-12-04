import fetchClient from "../client";
import { ENDPOINTS } from "../endpoint";

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

export const fetchDoctorDetails = async (email) => {
  try {
    const response = await fetch(ENDPOINTS.getDoctorByEmail(email)); 

    if (!response.ok) {
      throw new Error('Failed to fetch doctor details');
    }
    const data = await response.json();
    return data.body; // Return the doctor details
  } catch (error) {
    console.error('Error fetching doctor details:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const saveDoctorAvailability = async (availability) => {
  const response = await fetch(ENDPOINTS.setDoctorAvailability, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(availability), 
  });

  if (!response.ok) {
    throw new Error('Failed to save availability');
  }

  return response;
};