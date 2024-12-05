import React, {useState, useEffect} from 'react';
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
                const {status_code, body} = await getPatientByEmail(email);
                if(status_code!=200){
                    setError(body)
                }else{
                setData(body);
                }

            } catch (err){
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fecthPatientByEmail();
    }, [email])

    return {data, loading, error}
}

