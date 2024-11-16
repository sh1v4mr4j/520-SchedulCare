import {useMemo} from "react"

const mapService = () => {
    const getGoogleApiKey = useMemo(() => {
        return process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    }, []);

    return { getGoogleApiKey };
}

export default mapService;