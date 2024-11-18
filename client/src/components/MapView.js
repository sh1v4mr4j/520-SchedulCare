import {useEffect, useState} from "react";
import mapService from "../services/map-view/map-view-service";
import PropTypes from "prop-types";

// MapView.propTypes = {
//     width: PropTypes.number,
//     height: PropTypes.number,
//     mapMode: PropTypes.oneOf(['place', 'search', 'directions']).isRequired,
//     mapParams: PropTypes.any.isRequired
// }
//
// MapView.defaultProps = {
//     width: 600,
//     height: 450,
// }

const MapView = ({width=600, height=450, mapMode, mapParams}) => {
    const {getGoogleApiKey, createMapEmberUrl} = mapService();
    const [apiKey, setApiKey] = useState(null);

    useEffect(() => {
        setApiKey(getGoogleApiKey);
    }, [getGoogleApiKey]);

    return (
        <div>
            <iframe
                width="600"
                height="450"
                style={{border: 0}}
                src={createMapEmberUrl(mapMode, mapParams)}
                allowFullScreen />
        </div>
    );
};

export default MapView;
