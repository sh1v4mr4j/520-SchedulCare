import { useState, useEffect } from "react";
import { getScheduleByEmail } from "../api/services/doctorService";

export const useGetSchedule = (email) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!email) {
      setError("No email associated");
      setLoading(false);
    } else {
      const fetchScheduleByEmail = async () => {
        try {
          setLoading(true);
          const { status_code, body } = await getScheduleByEmail(email);
          if (status_code != 200) {
            setError(body);
          }
          setData(body);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchScheduleByEmail();
    }
  }, [email]);
  return { data, loading, error };
};
