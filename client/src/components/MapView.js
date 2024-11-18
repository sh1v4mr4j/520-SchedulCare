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
    const {getGoogleApiKey, createMapEmbedUrl} = mapService();
    const [apiKey, setApiKey] = useState(null);

    useEffect(() => {
        setApiKey(getGoogleApiKey);
    }, [getGoogleApiKey]);

    console.log('Map Mode', mapMode);
    console.log('Map Params', mapParams);

    return (
        <div>
            <iframe
                width={width}
                height={height}
                style={{border: 0}}
                src={createMapEmbedUrl(mapMode, mapParams)}
                allowFullScreen />
        </div>
    );
};

export default MapView;
