import request from "supertest";
import app from "../app"; // Import the Express app

describe("Location API Tests", () => {
  it("Should return location list", async () => {
    const response = await request(app).get("/api/v1/locations");
    expect(response.status).toBe(200);
    console.log("response.body", response.body);
    expect(response.body.locations.length).toBeGreaterThan(0);
  });
});
