import fetchClient from "../client";
import { ENDPOINTS } from "../endpoint";

export const getRegisterUrl = async (secret, email) => {
  const url = ENDPOINTS.getRegistrationQrCode;
  return fetchClient(url, {
    method: "POST",
    body: JSON.stringify({ secret, email }),
  });
};

export const verifyOtp = async (secret, otp) => {
  const url = ENDPOINTS.verifyOtp;
  return fetchClient(url, {
    method: "POST",
    body: JSON.stringify({ secret, otp }),
  });
};
