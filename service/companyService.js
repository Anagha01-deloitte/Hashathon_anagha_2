
const companyDao = require("../dao/companyDAO")

exports.createCompanyService = async(body) =>{
    await companyDao.createCompany(body);
    return;
}

exports.getAllCompaniesService = async() =>{
    return await companyDao.getAllCompanies();
}

exports.updateCompany = async (params, body) =>{

    return await companyDao.updateCompany(params, body);
}

exports.findCompanyService = async (params) =>{
    return await companyDao.findCompany(params);
    
}

exports.deleteCompanyService = async (params) =>{
    return await companyDao.deleteCompany(params);
}