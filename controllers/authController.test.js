const request = require("supertest");
const authService = require("../service/authService");
const employeeService = require("../service/employeeService");
const app = require("../app"); 

jest.mock("../service/authService");
jest.mock("../service/employeeService");

describe("Authentication Controller", () => {
  describe("POST /login", () => {
    it("should log in a user and return a token", async () => {
      const mockEmployee = {
        _id: "user_id",
        userName: "testuser",
        password: "hashed_password",
      };
      
      const mockToken = "mock_token";

      employeeService.getEmployeeService.mockResolvedValue(mockEmployee);
      authService.loginService.mockResolvedValue(mockToken);

      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ userName: "testuser", password: "password123" });

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body.message).toBe("loggedIn succesfully");
      expect(res.body.data.token).toBe(mockToken);
    });

    it("should return 400 if userName is missing", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ password: "password123" });

      expect(res.statusCode).toBe(400);
      expect(res.body.status).toBe("Failed");
      expect(res.body.message).toBe("Please enter user name");
    });

    it("should return 400 if password is missing", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ userName: "testuser" });

      expect(res.statusCode).toBe(400);
      expect(res.body.status).toBe("Failed");
      expect(res.body.message).toBe("Please enter password");
    });

    
  });

  describe("POST /api/v1/auth/signup", () => {
    it("should create a new user and return 201", async () => {
      const mockResult = {
        newEmployee: {
          _id: "user_id",
          userName: "newuser",
          password: "hashed_password",
        },
      };

      authService.sigupService.mockResolvedValue(mockResult);

      const res = await request(app)
        .post("/api/v1/auth/signup")
        .send({ userName: "newuser", password: "password123" });

      expect(res.statusCode).toBe(201);
      expect(res.body.status).toBe("success");
      expect(res.body.data).toEqual(mockResult);
    });

    it("should return 400 if the provided userName already exists", async () => {
      const mockResult = {
        code: "11000",
      };

      authService.sigupService.mockResolvedValue(mockResult);

      const res = await request(app)
        .post("/api/v1/auth/signup")
        .send({ userName: "existinguser", password: "password123" });

      expect(res.statusCode).toBe(400);
      expect(res.body.status).toBe("Failed");
      expect(res.body.message).toBe("Duplicate key error");
    });
  });

  
});
