import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app";

describe("GET /", () => {
  it("returns the health payload", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "ResumeUp backend is running!",
    });
  });
});
