export const API_BASE_URL = "http://127.0.0.1:8000";

export const ENDPOINTS = {
  getDoctorsByPincode: (pincode) => `${API_BASE_URL}/doctors/${pincode}`,
  addDoctor: `${API_BASE_URL}/doctors/add`,
  scheduleAppointment: (email) =>
    `${API_BASE_URL}/patients/${email}/scheduleAppointment`,
  getPatientByEmail: (email) => `${API_BASE_URL}/patients/${email}/patient`,
  setPatientLocation: () => `${API_BASE_URL}/patients/setAddress`,
  setDoctorLocation: () => `${API_BASE_URL}/doctors/setAddress`,
  createOrder: `${API_BASE_URL}/payments/orders`,
  capturePayment: (order_id) =>
    `${API_BASE_URL}/payments/orders/${order_id}/capture`,
  cahtAssistant: `${API_BASE_URL}/chat/generate`

};