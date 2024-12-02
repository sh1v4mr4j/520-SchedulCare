import { useState } from "react";
import { addDoctor } from "../api/services/doctorService";

export const useAddDoctor = async (doctorData) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddDoctor = async (doctorData) => {
    try {
      setLoading(true);
      const result = await addDoctor(doctorData);
      return result;
    } catch {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return {handleAddDoctor, loading, error};
};
