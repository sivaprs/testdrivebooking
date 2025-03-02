import httpClient from "../helpers/httpClient";

class LocationService {
  async getLocations() {
    return httpClient.get(`api/v1/locations`);
  }
}

export default new LocationService();
