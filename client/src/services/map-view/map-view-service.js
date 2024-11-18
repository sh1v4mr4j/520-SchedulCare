import {useMemo} from "react"
import {OpenLocationCode} from "open-location-code";

const mapConfig = {
  'search': ['q'],
  'place': ['q'],
  'view': ['center']
}

const mapService = () => {

  /**
   * Get Google Maps API key from environment variables
   */
  const getGoogleApiKey = useMemo(() => {
    return process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  }, []);

  /**
   * Search for a place using Nominatim API
   * @param searchString - Search query
   * @param limit - Number of results to return
   * @returns {Promise<any>}
   */
  const searchNominatim = (searchString, limit = 30) => {
    const url = `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${encodeURIComponent(searchString)}&format=jsonv2&limit=${limit}`
    return fetch(url).then(response => response.json());
  }

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

    const missingParams = requiredParams.filter(param => !(param in mapParams));
    if (missingParams.length > 0) {
      throw new Error(`Missing required parameters: ${missingParams}`);
    }
  }

  /**
   * Create a Google Maps Embed URL
   * @param mapMode - Map mode (search, place, view, directions)
   * @param mapParams - Map parameters
   * @returns {`https://www.google.com/maps/embed/v1/${string}?key=${any}`}
   */
  const createMapEmbedUrl = (mapMode, mapParams) => {
    validateMapParams(mapMode, mapParams);
    let paramString = '';
    Object.keys(mapParams).forEach(key => {
      const value = mapParams[key];
      paramString = paramString.concat(`&${key}=${value}`);
    });
    return `https://www.google.com/maps/embed/v1/${mapMode}?key=${getGoogleApiKey}${paramString}`;
  }

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
  }

  /**
   * Get Plus Code for a given latitude and longitude
   * @param latitude - Latitude
   * @param longitude - Longitude
   * @returns {string} - Plus Code
   */
  const getPlusCode = (latitude, longitude) => {
    return new OpenLocationCode().encode(latitude, longitude);
  }

  return {getGoogleApiKey, searchNominatim, createMapEmbedUrl, getUserLocation, getPlusCode};
}

export default mapService;