import {useMemo} from "react"

const mapService = () => {
    const getGoogleApiKey = useMemo(() => {
        return process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    }, []);

    const searchNominatim = (searchString, limit = 30) => {
        const url = `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${encodeURIComponent(searchString)}&format=jsonv2&limit=${limit}`
        return fetch(url).then(response => response.json());
    }

    return { getGoogleApiKey, searchNominatim };
}

export default mapService;