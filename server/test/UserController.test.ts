import request from "supertest";
// server/src/controllers/UserController.test.ts
import { app } from "../server"; // Assuming your Express app is exported from server.ts
import { pool } from "../database/PostgreDatabase";

jest.mock("../database/PostgreDatabase", () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe("UserController", () => {
  // describe("deleteUser", () => {
  //   it("should delete a user successfully", async () => {
  //     (pool.query as jest.Mock).mockResolvedValueOnce({ rowCount: 1 });

  //     const response = await request(app).delete("/users/1");

  //     expect(response.status).toBe(200);
  //     expect(response.body.message).toBe("User deleted successfully");
  //   });

  //   it("should return 404 if user not found", async () => {
  //     (pool.query as jest.Mock).mockResolvedValueOnce({ rowCount: 0 });

  //     const response = await request(app).delete("/users/1");

  //     expect(response.status).toBe(404);
  //     expect(response.body.error).toBe("User not found");
  //   });

  //   it("should return 500 if there is a server error", async () => {
  //     (pool.query as jest.Mock).mockRejectedValueOnce(
  //       new Error("Database error")
  //     );

  //     const response = await request(app).delete("/users/1");

  //     expect(response.status).toBe(500);
  //     expect(response.body.error).toBe("Internal Server Error");
  //   });
  // });
  describe("createUser", () => {
    it("should create a user successfully", async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce({ rowCount: 1 });

      const response = await request(app).post("/api/users").send({
        username: "test",
        email: "test@gmail.com",
        password: "password",
      });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("User created successfully");
    });

    it("should return 400 if required fields are missing", async () => {
      const response = await request(app).post("/api/users").send({
        username: "test",
        // Missing email and password
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Invalid data");
    });
  });
});
