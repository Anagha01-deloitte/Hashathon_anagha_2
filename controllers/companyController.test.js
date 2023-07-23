const request = require("supertest");
const companyService = require("../service/companyService");
const app = require("../app"); 

jest.mock("../service/companyService", () => ({
  getAllCompaniesService: jest.fn(),
  createCompanyService: jest.fn(),
  updateCompany: jest.fn(),
  findCompanyService: jest.fn(),
  deleteCompanyService: jest.fn(),
}));

describe("Company Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/v1/company", () => {
    it("should return a list of all companies", async () => {
      companyService.getAllCompaniesService.mockResolvedValue([{ name: "Company A" }, { name: "Company B" }]);
      
      const res = await request(app).get("/api/v1/company");
      
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body.result).toEqual(expect.arrayContaining([{ name: "Company A" }, { name: "Company B" }]));
    });
  });

  describe("POST /companies", () => {
    it("should create a new company", async () => {
      companyService.createCompanyService.mockResolvedValue();
      
      const res = await request(app)
        .post("/api/v1/company")
        .send({ name: "New Company" });

      expect(res.statusCode).toBe(201);
      expect(res.body.status).toBe("success");
      expect(res.body.message).toBe("Company created");
    });
  });

  describe("PUT /api/v1/company/:id", () => {
    it("should update an existing company", async () => {
      companyService.updateCompany.mockResolvedValue({ id: 1, name: "Updated Company" });

      const res = await request(app)
        .patch("/api/v1/company/1")
        .send({ name: "Updated Company" });

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body.data).toEqual({ id: 1, name: "Updated Company" });
    });

    it("should return 404 if the company with the given ID doesn't exist", async () => {
      companyService.updateCompany.mockResolvedValue(null);

      const res = await request(app)
        .patch("/api/v1/company/1")
        .send({ name: "Updated Company" });

      expect(res.statusCode).toBe(404);
      expect(res.body.status).toBe("Failed");
      expect(res.body.message).toBe("Company with that ID doesn't exist");
    });
  });

  describe("GET /api/v1/company/:id", () => {
    it("should get a specific company by ID", async () => {
      companyService.findCompanyService.mockResolvedValue({ id: 1, name: "Company A" });

      const res = await request(app).get("/api/v1/company/1");

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe("success");
      expect(res.body.data).toEqual({ id: 1, name: "Company A" });
    });

    it("should return 404 if the company with the given ID doesn't exist", async () => {
      companyService.findCompanyService.mockResolvedValue(null);

      const res = await request(app).get("/api/v1/company/1");

      expect(res.statusCode).toBe(404);
      expect(res.body.status).toBe("Failed");
      expect(res.body.message).toBe("Company with that ID doesn't exist");
    });
  });

  describe("DELETE /companies/:id", () => {
    it("should delete a specific company by ID", async () => {
      companyService.findCompanyService.mockResolvedValue({ id: 1, name: "Company A" });
      companyService.deleteCompanyService.mockResolvedValue();

      const res = await request(app).delete("/api/v1/company/1");

      expect(res.statusCode).toBe(204);
    });

    it("should return 404 if the company with the given ID doesn't exist", async () => {
      companyService.findCompanyService.mockResolvedValue(null);

      const res = await request(app).delete("/api/v1/company/1");

      expect(res.statusCode).toBe(404);
      expect(res.body.status).toBe("Failed");
      expect(res.body.message).toBe("Company with that ID doesn't exist");
    });
  });
});
