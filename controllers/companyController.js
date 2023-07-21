const companyService = require("../service/companyService");

exports.getAllCompanies = async (req,res)=>{
    const data = await companyService.getAllCompaniesService();
    return res.status(200).json({
        status:"success",
        result:data
    })
}

exports.createCompany = async (req,res)=>{
    await companyService.createCompanyService(req.body);
    return res.status(201).json({
        status:"success",
        message:"Company created"
    })
}

exports.updateCompany = async (req,res) =>{
    const result = await companyService.updateCompany(req.params, req.body);
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

exports.getCompany = async (req,res) =>{
    const result = await companyService.findCompanyService(req.params);

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

exports.deleteCompany = async (req,res) =>{
    const result = await companyService.findCompanyService(req.params);

    if(!result){
        return res.status(404).json({
            status:"Failed",
            message: "Company with that ID doesn't exist"
        })
    }
    await companyService.deleteCompanyService(req.params);
    return res.status(204).send();
}
