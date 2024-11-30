import React, {useState} from 'react';
import { getPatientByEmail } from '../api/services/patientService';

export const usePatientByEmail = (email) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        if(!email) return {data, loading, error: "send email arg"};

        const fecthPatientByEmail = async () => {
            try {
                setLoading(true);
                const data = await getPatientByEmail(email);
                setData(data);
            } catch (err){
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fecthPatientByEmail();

        return {data, loading, error}
    }, [email])
}

