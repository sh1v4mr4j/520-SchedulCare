import {useEffect, useState} from "react";
import mapService from "../services/map-view/map-view-service";

const MapView = () => {
    const {getGoogleApiKey} = mapService();
    const [apiKey, setApiKey] = useState(null);

    useEffect(() => {
        setApiKey(getGoogleApiKey);
    }, [getGoogleApiKey]);

    const location_query_str = "Amherst, MA";
    const location_query = encodeURIComponent(location_query_str);
    console.log(location_query_str, location_query);

    return (
        <div>
            <iframe
                width="600"
                height="450"
                style={{border: 0}}
                src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${location_query}`}
                allowFullScreen />
        </div>
    );
};

export default MapView;
