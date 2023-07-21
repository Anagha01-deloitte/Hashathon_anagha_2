const employeeService = require("../service/employeeService");

exports.getEmployee = async(req,res)=>{
    const result = await employeeService.getEmployeeService(req.params);

    if(!result){
        return res.status(404).json({
            status:"Failed",
            message: "Company with that ID doesn't exist"
        })
    }
    return res.status(200).json({
        status:"success",
        data: result
    })
}

exports.getEmployees=async(req,res)=>{
    const data = await employeeService.getAllEmployeeService();
    return res.status(200).json({
        status:"success",
        result:data
    })
}

exports.updateEmployee = async (req,res) =>{
    const result = await employeeService.updateEmployeeService(req.params, req.body);
    if(!result){
        return res.status(404).json({
            status:"Failed",
            message: "Employee with that ID doesn't exist"
        })
    }
    return res.status(200).json({
        status:"success",
        data: result
    })
}

exports.getEmployee = async (req,res) =>{
    const result = await employeeService.getEmployeeService(req.params);

    if(!result){
        return res.status(404).json({
            status:"Failed",
            message: "Employee with that ID doesn't exist"
        })
    }
    return res.status(200).json({
        status:"success",
        data: result
    })
}

exports.deleteEmployee = async (req,res) =>{
    const result = await employeeService.deleteEmployeeService(req.params);

    if(!result){
        return res.status(404).json({
            status:"Failed",
            message: "Employee with that ID doesn't exist"
        })
    }
    return res.status(204).send();
}
