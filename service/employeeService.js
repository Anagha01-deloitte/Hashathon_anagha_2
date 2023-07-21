const employeeDao = require("../dao/employeeDAO");


exports.getEmployeeService = async(params)=>{

    return await employeeDao.getEmployee(params);
}