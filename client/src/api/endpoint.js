import { verifyTimeOtp } from "./services/mfaService";

export const API_BASE_URL = "http://127.0.0.1:8000";

export const ENDPOINTS = {
  getDoctorsByPincode: (pincode) =>
    `${API_BASE_URL}/doctors/${pincode}/allDoctors`,
  addDoctor: `${API_BASE_URL}/doctors/add`,
  scheduleAppointment: (email) =>
    `${API_BASE_URL}/patients/${email}/scheduleAppointment`,
  getPatientByEmail: (email) => `${API_BASE_URL}/patients/${email}/patient`,
  setPatientLocation: () => `${API_BASE_URL}/patients/setAddress`,
  setDoctorLocation: () => `${API_BASE_URL}/doctors/setAddress`,
  createOrder: `${API_BASE_URL}/payments/orders`,
  capturePayment: (order_id) =>
    `${API_BASE_URL}/payments/orders/${order_id}/capture`,
  chatAssistant: `${API_BASE_URL}/chat/generate`,
  patientLogin: `${API_BASE_URL}/patients/patientLogin`,
  doctorLogin: `${API_BASE_URL}/doctors/doctorLogin`,
  getRegistrationQrCode: `${API_BASE_URL}/mfa/generateQrCode`,
  verifyOtp: `${API_BASE_URL}/mfa/verifyOtp`,
  addPatient: `${API_BASE_URL}/patients/addPatient`,
  addDoctor: `${API_BASE_URL}/doctors/addDoctor`,
  setDoctorAvailability: `${API_BASE_URL}/doctors/doctor/doctorSchedule`,
  sendEmail: `${API_BASE_URL}/email/send-email`,
  doctorByEmail: (email) => `${API_BASE_URL}/doctors/doctor/${email}`,
  getDoctorByEmail: (email) => `${API_BASE_URL}/doctors/${email}/schedule`,
};
