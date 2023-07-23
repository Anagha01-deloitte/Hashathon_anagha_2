const employeeController = require("../controllers/employeeController");
const employeeService = require("../service/employeeService");

jest.mock("../service/employeeService");

describe("Employee Controller", () => {
  describe("GET /employees/:id", () => {
    it("should return a specific employee", async () => {
      const mockEmployee = { _id: "employee_id", name: "John Doe" };
      employeeService.getEmployeeService.mockResolvedValue(mockEmployee);

      const req = { params: { id: "employee_id" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await employeeController.getEmployee(req, res);

      expect(employeeService.getEmployeeService).toHaveBeenCalledWith(req.params);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: mockEmployee,
      });
    });

    it("should return 404 if the employee with the given ID doesn't exist", async () => {
      employeeService.getEmployeeService.mockResolvedValue(null);

      const req = { params: { id: "nonexistent_id" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await employeeController.getEmployee(req, res);

      expect(employeeService.getEmployeeService).toHaveBeenCalledWith(req.params);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "Failed",
        message: "Employee with that ID doesn't exist",
      });
    });
  });

  describe("GET /employees", () => {
    it("should return a list of all employees", async () => {
      const mockEmployees = [{ _id: "employee1", name: "John Doe" }, { _id: "employee2", name: "Jane Smith" }];
      employeeService.getAllEmployeeService.mockResolvedValue(mockEmployees);

      const req = { };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await employeeController.getEmployees(req, res);

      expect(employeeService.getAllEmployeeService).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        result: mockEmployees,
      });
    });

    it("should return paginated results if query parameters are provided", async () => {
      const mockPaginatedData = {
        currentPage: 1,
        totalPages: 3,
        data: [{ _id: "employee1", name: "John Doe" }, { _id: "employee2", name: "Jane Smith" }],
      };
      employeeService.employeePaginationService.mockResolvedValue(mockPaginatedData);

      const req = {
        query: { page: "1", limit: "2" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await employeeController.getEmployees(req, res);

      expect(employeeService.employeePaginationService).toHaveBeenCalledWith(req.query);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        result: mockPaginatedData,
      });
    });
  });

  describe("PUT /employees/:id", () => {
    it("should update an existing employee", async () => {
      const mockUpdatedEmployee = { _id: "employee_id", name: "Updated Employee" };
      employeeService.updateEmployeeService.mockResolvedValue(mockUpdatedEmployee);

      const req = { params: { id: "employee_id" }, body: { name: "Updated Employee" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await employeeController.updateEmployee(req, res);

      expect(employeeService.updateEmployeeService).toHaveBeenCalledWith(req.params, req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: "success",
        data: mockUpdatedEmployee,
      });
    });

    it("should return 404 if the employee with the given ID doesn't exist", async () => {
      employeeService.updateEmployeeService.mockResolvedValue(null);

      const req = { params: { id: "nonexistent_id" }, body: { name: "Updated Employee" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await employeeController.updateEmployee(req, res);

      expect(employeeService.updateEmployeeService).toHaveBeenCalledWith(req.params, req.body);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "Failed",
        message: "Employee with that ID doesn't exist",
      });
    });
  });

  describe("DELETE /employees/:id", () => {
    it("should delete an employee", async () => {
      employeeService.deleteEmployeeService.mockResolvedValue({ id: "employee_id" });

      const req = { params: { id: "employee_id" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await employeeController.deleteEmployee(req, res);

      expect(employeeService.deleteEmployeeService).toHaveBeenCalledWith(req.params);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it("should return 404 if the employee with the given ID doesn't exist", async () => {
      employeeService.deleteEmployeeService.mockResolvedValue(null);

      const req = { params: { id: "nonexistent_id" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await employeeController.deleteEmployee(req, res);

      expect(employeeService.deleteEmployeeService).toHaveBeenCalledWith(req.params);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: "Failed",
        message: "Employee with that ID doesn't exist",
      });
    });
  });
});
