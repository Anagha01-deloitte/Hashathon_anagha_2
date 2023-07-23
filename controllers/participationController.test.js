const participationController = require("../controllers/participationController");
const participationService = require("../service/participationService");

jest.mock("../service/participationService");

describe("Participation Controller", () => {
  describe("GET /participants", () => {
    it("should return a list of all participants", async () => {
      const mockParticipants = [
        { _id: "participant1", name: "Participant A" },
        { _id: "participant2", name: "Participant B" },
      ];
      participationService.getAllParticipantsService.mockResolvedValue(mockParticipants);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await participationController.getAllParticipants(req, res);

      expect(participationService.getAllParticipantsService).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "Success",
        data: mockParticipants,
      });
    });

    it("should return 400 if there is an error in the result", async () => {
      const mockError = "Error fetching participants";
      participationService.getAllParticipantsService.mockResolvedValue({ error: mockError });

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await participationController.getAllParticipants(req, res);

      expect(participationService.getAllParticipantsService).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "Failed",
        error: mockError,
      });
    });
  });

  describe("POST /participants", () => {
    it("should create a new participation", async () => {
      const mockNewParticipation = { _id: "new_participation", name: "New Participation" };
      participationService.createParticipationService.mockResolvedValue(mockNewParticipation);

      const req = { body: { name: "New Participation" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await participationController.createParticipation(req, res);

      expect(participationService.createParticipationService).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "Success",
        data: mockNewParticipation,
      });
    });

    it("should return 400 if there is an error in the result", async () => {
      const mockError = "Error creating participation";
      participationService.createParticipationService.mockResolvedValue({ error: mockError });

      const req = { body: { name: "New Participation" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await participationController.createParticipation(req, res);

      expect(participationService.createParticipationService).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "Failed",
        error: mockError,
      });
    });
  });

  describe("GET /participants/:hackathonId", () => {
    it("should return a list of participants for a specific hackathon", async () => {
      const mockParticipants = [
        { _id: "participant1", name: "Participant A" },
        { _id: "participant2", name: "Participant B" },
      ];
      const mockHackathonId = "hackathon_id";
      participationService.getParticipantsOfHackathonService.mockResolvedValue(mockParticipants);

      const req = { params: { hackathonId: mockHackathonId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await participationController.getParticipantsOfHackathon(req, res);

      expect(participationService.getParticipantsOfHackathonService).toHaveBeenCalledWith(
        req.params
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "Success",
        data: mockParticipants,
      });
    });

    it("should return 400 if there is an error in the result", async () => {
      const mockError = "Error fetching participants of hackathon";
      participationService.getParticipantsOfHackathonService.mockResolvedValue({
        error: mockError,
      });

      const req = { params: { hackathonId: "nonexistent_id" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await participationController.getParticipantsOfHackathon(req, res);

      expect(participationService.getParticipantsOfHackathonService).toHaveBeenCalledWith(
        req.params
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "Failed",
        error: mockError,
      });
    });
  });

  describe("GET /participants/employee/:employeeId", () => {
    it("should return a list of hackathons for a specific employee", async () => {
      const mockHackathons = [
        { _id: "hackathon1", name: "Hackathon A" },
        { _id: "hackathon2", name: "Hackathon B" },
      ];
      const mockEmployeeId = "employee_id";
      participationService.getHackathonsOfEmployeeService.mockResolvedValue(mockHackathons);

      const req = { params: { employeeId: mockEmployeeId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await participationController.getHackathonsOfEmployee(req, res);

      expect(participationService.getHackathonsOfEmployeeService).toHaveBeenCalledWith(
        req.params
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "Success",
        data: mockHackathons,
      });
    });

    it("should return 400 if there is an error in the result", async () => {
      const mockError = "Error fetching hackathons of employee";
      participationService.getHackathonsOfEmployeeService.mockResolvedValue({
        error: mockError,
      });

      const req = { params: { employeeId: "nonexistent_id" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await participationController.getHackathonsOfEmployee(req, res);

      expect(participationService.getHackathonsOfEmployeeService).toHaveBeenCalledWith(
        req.params
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "Failed",
        error: mockError,
      });
    });
  });

  describe("GET /participants/organizer/:organizerId", () => {
    it("should return a list of hackathons for a specific organizer", async () => {
      const mockHackathons = [
        { _id: "hackathon1", name: "Hackathon A" },
        { _id: "hackathon2", name: "Hackathon B" },
      ];
      const mockOrganizerId = "organizer_id";
      participationService.getHackathonsOfOrganizerService.mockResolvedValue(mockHackathons);

      const req = { params: { organizerId: mockOrganizerId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await participationController.getHackathonsOfOrganizer(req, res);

      expect(participationService.getHackathonsOfOrganizerService).toHaveBeenCalledWith(
        req.params
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "Success",
        data: mockHackathons,
      });
    });

    it("should return 400 if there is an error in the result", async () => {
      const mockError = "Error fetching hackathons of organizer";
      participationService.getHackathonsOfOrganizerService.mockResolvedValue({
        error: mockError,
      });

      const req = { params: { organizerId: "nonexistent_id" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await participationController.getHackathonsOfOrganizer(req, res);

      expect(participationService.getHackathonsOfOrganizerService).toHaveBeenCalledWith(
        req.params
      );
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: "Failed",
        error: mockError,
      });
    });
  });
});
