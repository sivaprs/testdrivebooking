import httpClient from "../helpers/httpClient";

class BookingService {
  async createBooking(data: any) {
    return httpClient.post(`api/v1/bookings`, data);
  }

  async checkAvailability(
    type: string,
    location: string,
    dateTime: string,
    duration: string
  ) {
    return httpClient.get(
      `api/v1/bookings?location=${location}&dateTime=${dateTime}&duration=${duration}&type=${type}`
    );
  }
}

export default new BookingService();
