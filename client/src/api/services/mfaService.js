import fetchClient from "../client";
import { ENDPOINTS } from "../endpoint";

export const getRegisterUrl = async (email) => {
  const url = ENDPOINTS.getRegistrationQrCode;
  return fetchClient(url, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};

export const verifyOtp = async (email, otp) => {
  const url = ENDPOINTS.verifyOtp;
  return fetchClient(url, {
    method: "POST",
    body: JSON.stringify({ email, otp }),
  });
};
