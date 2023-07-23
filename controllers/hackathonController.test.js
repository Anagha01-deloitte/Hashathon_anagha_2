const hackathonController = require("./hackathonControlller");
const hackathonService = require("../service/hackathonService");

jest.mock("../service/hackathonService");

describe("Hackathon Controller", () => {
  describe("GET /hackathons", () => {
    it("should return a list of all hackathons", async () => {
      const mockHackathons = [{ _id: "hackathon1", name: "Hackathon A" }, { _id: "hackathon2", name: "Hackathon B" }];
      hackathonService.getAllHackathonsService.mockResolvedValue(mockHackathons);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await hackathonController.getAllHackathons(req, res);

      expect(hackathonService.getAllHackathonsService).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "Success",
        data: mockHackathons,
      });
    });

    it("should return paginated results if query parameters are provided", async () => {
      const mockPaginatedData = {
        currentPage: 1,
        totalPages: 3,
        data: [{ _id: "hackathon1", name: "Hackathon A" }, { _id: "hackathon2", name: "Hackathon B" }],
      };
      hackathonService.hackathonSearchService.mockResolvedValue(mockPaginatedData);

      const req = {
        query: { page: "1", limit: "2" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await hackathonController.getAllHackathons(req, res);

      expect(hackathonService.hackathonSearchService).toHaveBeenCalledWith(req.query);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "Success",
        data: mockPaginatedData,
      });
    });

    it("should return 400 if there is an error in the result", async () => {
      const mockError = "Error fetching hackathons";
      hackathonService.hackathonSearchService.mockResolvedValue({ error: mockError });

      const req = { query: { page: "1", limit: "2" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await hackathonController.getAllHackathons(req, res);

      expect(hackathonService.hackathonSearchService).toHaveBeenCalledWith(req.query);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "Failed",
        error: mockError,
      });
    });
  });

  describe("POST /hackathons", () => {
    it("should create a new hackathon", async () => {
      const mockNewHackathon = { _id: "new_hackathon", name: "New Hackathon" };
      hackathonService.createHackathonService.mockResolvedValue(mockNewHackathon);

      const req = { body: { name: "New Hackathon" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await hackathonController.createHackathon(req, res);

      expect(hackathonService.createHackathonService).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "Success",
        data: mockNewHackathon,
      });
    });

    it("should return 400 if there is an error in the result", async () => {
      const mockError = "Error creating hackathon";
      hackathonService.createHackathonService.mockResolvedValue({ error: mockError });

      const req = { body: { name: "New Hackathon" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await hackathonController.createHackathon(req, res);

      expect(hackathonService.createHackathonService).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "Failed",
        error: mockError,
      });
    });
  });

  describe("PUT /hackathons/:id", () => {
    it("should update an existing hackathon", async () => {
      const mockUpdatedHackathon = { _id: "hackathon_id", name: "Updated Hackathon" };
      hackathonService.updateHackathonService.mockResolvedValue(mockUpdatedHackathon);

      const req = { params: { id: "hackathon_id" }, body: { name: "Updated Hackathon" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await hackathonController.updateHackathon(req, res);

      expect(hackathonService.updateHackathonService).toHaveBeenCalledWith(req.params, req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: mockUpdatedHackathon,
      });
    });

    it("should return 404 if the hackathon with the given ID doesn't exist", async () => {
      hackathonService.updateHackathonService.mockResolvedValue(null);

      const req = { params: { id: "nonexistent_id" }, body: { name: "Updated Hackathon" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await hackathonController.updateHackathon(req, res);

      expect(hackathonService.updateHackathonService).toHaveBeenCalledWith(req.params, req.body);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "Failed",
        message: "Hackathon with that ID doesn't exist",
      });
    });

    it("should return 404 if there is an error in the result", async () => {
      const mockError = "Error updating hackathon";
      hackathonService.updateHackathonService.mockResolvedValue({ error: mockError });

      const req = { params: { id: "hackathon_id" }, body: { name: "Updated Hackathon" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await hackathonController.updateHackathon(req, res);

      expect(hackathonService.updateHackathonService).toHaveBeenCalledWith(req.params, req.body);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "Failed",
        message: mockError,
      });
    });
  });

  describe("GET /hackathons/:id", () => {
    it("should return a specific hackathon", async () => {
      const mockHackathon = { _id: "hackathon_id", name: "Hackathon A" };
      hackathonService.getHackathonService.mockResolvedValue(mockHackathon);

      const req = { params: { id: "hackathon_id" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await hackathonController.getHackathon(req, res);

      expect(hackathonService.getHackathonService).toHaveBeenCalledWith(req.params);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: mockHackathon,
      });
    });

    it("should return 404 if the hackathon with the given ID doesn't exist", async () => {
      hackathonService.getHackathonService.mockResolvedValue(null);

      const req = { params: { id: "nonexistent_id" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await hackathonController.getHackathon(req, res);

      expect(hackathonService.getHackathonService).toHaveBeenCalledWith(req.params);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "Failed",
        message: "Hackathon with that ID doesn't exist",
      });
    });
  });

  describe("DELETE /hackathons/:id", () => {
    it("should delete a hackathon", async () => {
      hackathonService.deleteHackathonService.mockResolvedValue({ id: "hackathon_id" });

      const req = { params: { id: "hackathon_id" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await hackathonController.deleteHackathon(req, res);

      expect(hackathonService.deleteHackathonService).toHaveBeenCalledWith(req.params);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it("should return 404 if the hackathon with the given ID doesn't exist", async () => {
      hackathonService.deleteHackathonService.mockResolvedValue(null);

      const req = { params: { id: "nonexistent_id" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await hackathonController.deleteHackathon(req, res);

      expect(hackathonService.deleteHackathonService).toHaveBeenCalledWith(req.params);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "Failed",
        message: "Hackathon with that ID doesn't exist",
      });
    });
  });
});
