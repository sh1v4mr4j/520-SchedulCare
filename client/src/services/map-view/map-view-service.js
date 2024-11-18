import {useMemo} from "react"

const mapConfig = {
  'search': ['q'],
  'place': ['q'],
}

const mapService = () => {
  const getGoogleApiKey = useMemo(() => {
    return process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  }, []);

  const searchNominatim = (searchString, limit = 30) => {
    const url = `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${encodeURIComponent(searchString)}&format=jsonv2&limit=${limit}`
    return fetch(url).then(response => response.json());
  }

  const validateMapParams = (mapMode, mapParams) => {
    const requiredParams = mapConfig[mapMode];
    if (!requiredParams) {
      throw new Error(`Invalid map mode: ${mapMode}`);
    }

    const missingParams = requiredParams.filter(param => !(param in mapParams));
    if (missingParams.length > 0) {
      throw new Error(`Missing required parameters: ${missingParams}`);
    }
  }

  const createMapEmbedUrl = (mapMode, mapParams) => {
    validateMapParams(mapMode, mapParams);
    let paramString = '';
    Object.keys(mapParams).forEach(key => {
      const value = mapParams[key];
      paramString = paramString.concat(`&${key}=${value}`);
    });
    return `https://www.google.com/maps/embed/v1/${mapMode}?key=${getGoogleApiKey}${paramString}`;
  }

  return {getGoogleApiKey, searchNominatim, createMapEmberUrl: createMapEmbedUrl};
}

export default mapService;