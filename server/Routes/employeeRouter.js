const {
  getEmployees,
  getEmployee,
  addEmployee,
  editEmployee,
  searchEmployee,
} = require("../authController/employeeController");

const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const router = express.Router();

//get

router.get("/searchEmployees", searchEmployee);
router.get("/getEmployees", getEmployees);
router.get("/getEmployee/:id", getEmployee);

// post

router.post("/addEmployee", addEmployee);

//put update

router.put("/edit/:id", editEmployee);

module.exports = router;
