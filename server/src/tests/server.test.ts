import request from "supertest";
import app from "../app"; // Import the Express app

describe("Genaral API Tests", () => {
  it("Should return 404 for an unknown route", async () => {
    const response = await request(app).get("/api/unknown");
    expect(response.status).toBe(404);
  });
});
