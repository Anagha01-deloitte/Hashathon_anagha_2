const Employee = require("../models/Employee");
const jwt = require("jsonwebtoken");
const companyDao = require("../dao/companyDAO")

exports.signup = async (body) =>{

    try {
        
        const {userName, password, email, companyId} = body;
    
        const company = await companyDao.findCompany({_id:companyId});
    
        const newEmployee = await Employee.create({
            userName,
            password,
            email,
            company
        });
    
        const token = jwt.sign({id:newEmployee._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
    
        return {newEmployee,token};
    }

    catch(err){
        return err;
    }
}

exports.login = async (body) =>{
    const {id} = body;
    const token = jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
    return token;
}