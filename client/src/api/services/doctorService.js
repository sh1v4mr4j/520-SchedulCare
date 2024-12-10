import fetchClient from "../client";
// Importing the ENDPOINTS object that contains API endpoint URLs
import { ENDPOINTS } from "../endpoint";

// Function to get doctors by their pincode
export const getDoctorsByPincode = async (pincode) => {
  // Constructing the URL using the pincode
  const url = ENDPOINTS.getDoctorsByPincode(pincode);
  // Making a GET request to fetch doctors by pincode
  return fetchClient(url);
};

// Function to add a new doctor
export const addDoctor = async (doctorData) => {
  const url = ENDPOINTS.addDoctor;
  return fetchClient(url, {
    method: "POST",
    body: JSON.stringify(doctorData),
  });
};

// Function to fetch details of a doctor by their email
export const fetchDoctorDetails = async (email) => {
  try {
    const response = await fetch(ENDPOINTS.doctorByEmail(email)); 

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

// Function to save a doctor's availability
export const saveDoctorAvailability = async (availability) => {
  const response = await fetch(ENDPOINTS.setDoctorAvailability, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(availability), 
  });

  if (!response.ok) {
    throw new Error('Failed to save availability');
  }
  // Returning the response if the availability was saved successfully
  return response;
};

// Function to get a doctor's schedule by their email
export const getScheduleByEmail = async (email) => {
  const url = ENDPOINTS.getDoctorByEmail(email);
  // Making a GET request to fetch the doctor's schedule by email
  return fetchClient(url);
}
