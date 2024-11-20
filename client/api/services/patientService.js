import fetchClient from "../client";
import { ENDPOINTS } from "../endpoint";

export const getPatientByEmail = async (email) => {
const url =  ENDPOINTS.getPatientByEmail(email);
return fetchClient(url);
}

export const scheduleAppointment = async(data) =>{
    const url = ENDPOINTs.scheduleAppointment(data?.email);
    return fetchClient(url, {
        method: "POST",
        body: JSON.stringify(data)
    })
}


