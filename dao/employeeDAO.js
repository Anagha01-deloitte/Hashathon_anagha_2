const Employee = require("../models/Employee");

exports.getEmployee = async(params)=>{
    return await Employee.findOne(params);
}

exports.getAllEmployees = async() =>{
    try {
        return await Employee.find();

    }catch(err){
        return {error:err};
    }
}

exports.updateEmployee = async (params, body) =>{
    const result = await Employee.findOneAndUpdate(params, body,{new:true});
    return result;
}

exports.getEmployee = async (params) =>{
    const result = await Employee.findOne(params);
    return result;
}

exports.deleteEmployee = async (params) =>{
    return await Employee.findOneAndDelete(params);
}
