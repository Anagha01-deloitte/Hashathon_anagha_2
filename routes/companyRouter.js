const express = require("express");
const companyController= require("../controllers/companyController");

const router=express.Router();

router
    .route("/")
    .get(companyController.getAllCompanies)
    .post(companyController.createCompany);

router
    .route("/:_id")
    .get(companyController.getCompany)
    .patch(companyController.updateCompany)
    .delete(companyController.deleteCompany);

module.exports=router;