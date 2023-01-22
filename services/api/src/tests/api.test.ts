import * as request from "supertest";
import {
  app,
  connectToDatabase,
  disconnectFromDatabase,
  removeDatabase,
} from "../app";

describe("Testing API", () => {
  const currencyCode = "GBP";

  beforeAll(() => {
    connectToDatabase(process.env.MONGODB_URI_TEST);
  });

  afterAll(async () => {
    await removeDatabase(process.env.MONGODB_URI_TEST);
    await disconnectFromDatabase();
  });

  it("post /api/currency should subscribe the requested currency", async () => {
    const response = await request(app)
      .post("/api/currency")
      .send({ code: currencyCode });

    expect(response.status).toBe(200);
    expect(response.body?.data?._code).toBe(currencyCode);
    expect(response.body?.data?._hasSubscription).toBeTruthy();
  });

  it("post /api/currency with the same code should result in error 400", async () => {
    const response = await request(app)
      .post("/api/currency")
      .send({ code: currencyCode });

    expect(response.status).toBe(400);
    expect(response.body?.data).toBe(
      `Currency ${currencyCode} is already subscribed`
    );
  });

  it("get /api/currencies endpoint should return the subscribed currency", async () => {
    const response = await request(app).get("/api/currencies");

    expect(response.status).toBe(200);
    expect(response.body?.data[0]._code).toBe(currencyCode);
    expect(response.body?.data[0]._hasSubscription).toBeTruthy();
    expect(response.body?.data[0]._ask).toBeGreaterThanOrEqual(0.0);
    expect(response.body?.data[0]._bid).toBeGreaterThanOrEqual(0.0);
    expect(response.body?.data[0]._exchangeRate).toBeGreaterThanOrEqual(0.0);
    expect(response.body?.data[0]._dailyHistory).toHaveLength(7);
  });

  it("put /api/currency/:code endpoint should unsubscribe the currency", async () => {
    const response = await request(app).put(`/api/currency/${currencyCode}`);

    expect(response.status).toBe(200);
    expect(response.body?.data._code).toBe(currencyCode);
    expect(response.body?.data._hasSubscription).toBeFalsy();
  });

  it("get /api/currencies endpoint should return an empty array", async () => {
    const response = await request(app).get("/api/currencies");

    expect(response.status).toBe(200);
    expect(response.body?.data).toHaveLength(0);
  });
});
