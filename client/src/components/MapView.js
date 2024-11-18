import {useEffect, useState} from "react";
import mapService from "../services/map-view/map-view-service";
import PropTypes from "prop-types";

const MapView = ({width=600, height=450, mapMode, mapParams}) => {
    const {getGoogleApiKey, createMapEmbedUrl} = mapService();
    const [apiKey, setApiKey] = useState(null);

    useEffect(() => {
        setApiKey(getGoogleApiKey);
    }, [getGoogleApiKey]);

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

MapView.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    mapMode: PropTypes.oneOf(['place', 'search', 'directions']).isRequired,
    mapParams: PropTypes.any.isRequired
}

MapView.defaultProps = {
    width: 600,
    height: 450,
}

export default MapView;
