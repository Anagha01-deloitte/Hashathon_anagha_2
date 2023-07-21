const express = require("express");
const employeeController= require("../controllers/employeeController");

const router=express.Router();

router
    .route("/:_id")
    .get(employeeController.getEmployee)
    .patch(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);

router
    .route("/")
    .get(employeeController.getEmployees)


module.exports=router;