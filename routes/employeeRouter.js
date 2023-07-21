const express = require("express");
const employeeController= require("../controllers/employeeController");

const router=express.Router();

router
    .route("/:_id")
    .get(employeeController.getEmployee);


module.exports=router;