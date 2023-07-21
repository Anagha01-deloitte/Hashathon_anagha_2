const employeeDao = require("../dao/employeeDAO");


exports.getEmployeeService = async(params)=>{

    return await employeeDao.getEmployee(params);
}

exports.getAllEmployeeService = async() =>{
    return await employeeDao.getAllEmployees();
}

exports.updateEmployeeService = async (params, body) =>{
    return await employeeDao.updateEmployee(params, body);
 }
 
 exports.getEmployeeService = async (params) =>{
    return await employeeDao.getEmployee(params);
    
 }
 
 exports.deleteEmployeeService = async (params) =>{
    return await employeeDao.deleteEmployee(params);
 }