import { useState, useEffect } from "react";
import { getDoctorsByPincode } from "../api/services/doctorService";

export const useDoctorsByPincode = (pincode) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pincode)
      return { doctors: [], loadind: false, error: "Add pincode value" };

    const fetchDoctorsByPincode = async () => {
      try {
        setLoading = true;
        const data = getDoctorsByPincode(pincode);
        setDoctors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorsByPincode();
  }, [pincode]);

  return { doctors, loading, error };
};
