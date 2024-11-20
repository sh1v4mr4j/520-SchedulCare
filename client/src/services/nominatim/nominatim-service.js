const nominatimService = () => {
  /**
   * Search for a place using Nominatim API
   * @param searchString - Search query
   * @param limit - Number of results to return
   * @returns {Promise<any>}
   */
  const searchNominatim = (searchString, limit = 30) => {
    const url = `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${encodeURIComponent(searchString)}&format=jsonv2&limit=${limit}`;
    return fetch(url).then((response) => response.json());
  };

  return {
    searchNominatim,
  };
};

export default nominatimService;
