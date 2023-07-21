const Company = require("../models/Company");


exports.createCompany = async(body ) =>{
    const { name } = body;
    await Company.create({
        name
    });
    return;
}

exports.getAllCompanies = async( ) =>{
    const result = await Company.find();
    return result;
}

exports.updateCompany = async (params, body) =>{
    const result = await Company.findOneAndUpdate(params, body,{new:true});
    return result;
}

exports.findCompany = async (params) =>{
    const result = await Company.findOne(params);
    return result;
}

exports.deleteCompany = async (params) =>{
    await Company.findOneAndDelete(params);
}