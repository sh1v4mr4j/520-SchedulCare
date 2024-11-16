import React, { useEffect, useState } from "react";
import mapService from "../services/map-view/map-view-service";

const MapView = () => {
  const { getGoogleApiKey } = mapService();
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    setApiKey(getGoogleApiKey);
  }, [getGoogleApiKey]);

  return <div>{apiKey}</div>;
};

export default MapView;
