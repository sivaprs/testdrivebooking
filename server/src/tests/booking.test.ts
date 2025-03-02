import request from "supertest";
import app from "../app";

describe("Booking API Tests", () => {
  it("Create Booking Status True", async () => {
    const payLoad = {
      vehicleId: "tesla_1001",
      startDateTime: "2023-10-18T08:15:00Z",
      duration: 45,
      customerName: "Nick",
      customerEmail: "nick@Smith.com",
      customerPhone: "+353851234567",
      minimumMinutesBetweenBookings: 15,
    };
    const response = await request(app).post(`/api/v1/bookings`).send(payLoad);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
  });

  it("Create Booking Status False", async () => {
    const payLoad = {
      vehicleId: "tesla_1001",
      startDateTime: "2023-10-18T08:15:00Z",
      duration: 45,
      customerName: "Nick",
      customerEmail: "nick@Smith.com",
      customerPhone: "+353851234567",
      minimumMinutesBetweenBookings: 15,
    };
    const response = await request(app).post(`/api/v1/bookings`).send(payLoad);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(false);
  });

  it("Create Booking Error", async () => {
    const payLoad = {
      vehicleId: "tesla_1001",
      startDateTime: "2023-10-18T08:15:00Z",
      duration: 45,
      customerName: "Nick",
      customerEmail: "nick@Smith.com",
      customerPhone: "+353851234567",
    };
    const response = await request(app).post(`/api/v1/bookings`).send(payLoad);
    expect(response.status).toBe(500);
  });

  it("Check Availability", async () => {
    const response = await request(app).get(
      `/api/v1/bookings?location=dublin&dateTime=2023-10-18T08:15:00Z&duration=45&type=tesla_model3`
    );
    expect(response.status).toBe(200);
    expect(response.body.availability).toBe(true);
  });
});
