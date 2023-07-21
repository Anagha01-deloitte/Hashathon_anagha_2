const Employee = require("../models/Employee");

exports.getEmployee = async(params)=>{
    return await Employee.findOne(params);
}