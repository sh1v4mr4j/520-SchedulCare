import PropTypes from "prop-types";
import { useMemo, useState, useEffect } from "react";
import { OpenLocationCode } from "open-location-code";
import { Alert, Spin } from "antd";

const MapView = ({
  width = 600,
  height = 450,
  mapMode = "userLoc",
  mapParams = {},
}) => {
  // Map configuration
  const mapConfig = {
    userLoc: [],
    search: ["q"],
    place: ["q"],
    view: ["center"],
  };

  // Alerts and Spinners
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapSpinner, setMapSpinner] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  // Map source URL
  const [mapSourceUrl, setMapSourceUrl] = useState("");

  /**
   * Get Google Maps API key from environment variables
   */
  const getGoogleApiKey = useMemo(() => {
    return process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  }, []);

  /**
   * Validate map parameters
   * @param mapMode - Map mode (search, place, view, directions)
   * @param mapParams - Map parameters
   */
  const validateMapParams = (mapMode, mapParams) => {
    const requiredParams = mapConfig[mapMode];
    if (!requiredParams) {
      throw new Error(`Invalid map mode: ${mapMode}`);
    }

    const missingParams = requiredParams.filter(
      (param) => !(param in mapParams)
    );
    if (missingParams.length > 0) {
      throw new Error(`Missing required parameters: ${missingParams}`);
    }
  };

  /**
   * Create a Google Maps Embed URL
   * @param mapMode - Map mode (search, place, view, directions)
   * @param mapParams - Map parameters
   * @returns {`https://www.google.com/maps/embed/v1/${string}?key=${any}`}
   */
  const createMap = (mapMode, mapParams) => {
    setMapSpinner(true);
    validateMapParams(mapMode, mapParams);

    // Handle user location mode
    if (mapMode === "userLoc") {
      createMapForUserLocation();
    } else {
      let paramString = "";
      Object.keys(mapParams).forEach((key) => {
        const value = mapParams[key];
        paramString = paramString.concat(`&${key}=${value}`);
      });
      setMapSourceUrl(
        `https://www.google.com/maps/embed/v1/${mapMode}?key=${getGoogleApiKey}${paramString}`
      );
      setMapLoaded(true);
      setMapSpinner(false);
    }
  };

  /**
   * Get user's location
   * @returns {Geolocation|null} - User's location
   */
  const getUserLocation = () => {
    const userLocation = navigator.geolocation;
    if (userLocation) {
      return userLocation;
    } else {
      console.error("Geolocation is not supported by this browser.");
      return null;
    }
  };

  const createMapForUserLocation = () => {
    console.log("Getting user location");
    getUserLocation().getCurrentPosition(
      (position) => {
        const locationCode = encodeURIComponent(
          getPlusCode(position.coords.latitude, position.coords.longitude)
        );
        // setMapLoaded(true);
        // setMapSpinner(false);
        console.log("Location Code", locationCode);
        setMapSourceUrl(
          `https://www.google.com/maps/embed/v1/place?key=${getGoogleApiKey}&q=${locationCode}`
        );
        setMapLoaded(true);
        setMapSpinner(false);
      },
      (error) => {
        console.log("Whoopsie");
        console.error(error);
        setShowAlert(true);
        setMapLoaded(false);
        setMapSpinner(false);
      }
    );
  };

  /**
   * Get Plus Code for a given latitude and longitude
   * @param latitude - Latitude
   * @param longitude - Longitude
   * @returns {string} - Plus Code
   */
  const getPlusCode = (latitude, longitude) => {
    return new OpenLocationCode().encode(latitude, longitude);
  };

  useEffect(() => {
    console.log("Use Effect", width, height, mapMode, mapParams);
    createMap(mapMode, mapParams);
  }, []);

  return (
    <div>
      {showAlert ? (
        <Alert
          closable
          type="error"
          showIcon
          message="Damn.. That's something even Google can't find"
        />
      ) : (
        <></>
      )}
      <Spin
        spinning={mapSpinner}
        percent="auto"
        size="large"
        tip="Teleporting ..."
        delay="500"
      >
        {mapLoaded ? (
          <iframe
            width={width}
            height={height}
            style={{ border: 0 }}
            src={mapSourceUrl}
            allowFullScreen
          />
        ) : (
          <> </>
        )}
      </Spin>
    </div>
  );
};

MapView.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  mapMode: PropTypes.string,
  mapParams: PropTypes.object,
};

export default MapView;
