import mongoose from "mongoose";
import request from "supertest";
import jwt from "jsonwebtoken";

import app from "../../../app.js";
import { User } from "../../../models/index.js";

const { DB_HOST_TEST, PORT, JWT_SECRET } = process.env;

const userCredentials = {
  email: "example.one@example.com",
  password: "examplepassword",
};
const userSubscriptions = ["starter", "pro", "business"];

describe("test loginUser route", () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    server = app.listen(PORT);
    await request(app).post("/api/users/register").send(userCredentials);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
    server.close();
  });

  test("login with correct data", async () => {
    const { statusCode, body } = await request(app)
      .post("/api/users/login")
      .send(userCredentials);

    expect(statusCode).toBe(200);

    expect(body).toEqual({
      token: expect.any(String),
      user: expect.objectContaining({
        email: expect.stringMatching(userCredentials.email),
        subscription: expect.any(String),
      }),
    });

    expect(body.token).not.toBe("");
    expect(userSubscriptions).toContain(body.user.subscription);

    const userData = await User.findOne({ email: userCredentials.email });
    const { id } = jwt.verify(body.token, JWT_SECRET);

    expect(id).toBe(userData._id.toString());
  });
});
