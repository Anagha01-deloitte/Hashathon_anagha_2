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

exports.getEmployees=(req,res)=>{

}