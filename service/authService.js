const authDoa = require("../dao/authAao");
exports.sigupService = async (body) =>{
    return await authDoa.signup(body);
};

exports.loginService = async (body) =>{
    return await authDoa.login(body)
}