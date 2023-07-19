import axios from "axios";

const getLocations = axios.create({
  baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places`,
  timeout: 1000,
});

export default getLocations;
