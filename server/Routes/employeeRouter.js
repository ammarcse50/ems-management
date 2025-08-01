const {
  getEmployee,
  addEmployee,
  editEmployee,
  searchEmployee,
  getSingleUser,
  totalEmployeesCount,
  deleteEmployee,
  upload,
  getAllUsers,
  getAllManagers,
  getEmployeesByDepartment,
  getActiveEmployeesUnderManager,
} = require("../controller/employeeController");
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const router = express.Router();

//get
router.get("/managers", authMiddleware, getAllManagers);
router.get("/searchEmployees", searchEmployee);
router.get("/getEmployees", getAllUsers);
router.get(
  "/getEmployeesByDepartment",
  authMiddleware,
  getEmployeesByDepartment
);
router.get("/getEmployeesCount", totalEmployeesCount);
router.get("/getEmployee/:id", getEmployee);
router.get(
  "/manager/active-employees",
  authMiddleware,
  getActiveEmployeesUnderManager
);
// post

router.post("/addEmployee", upload.single("profileImage"), addEmployee);

//put update

router.put("/updateEmployee/:id", upload.single("profileImage"), editEmployee);

router.get("/getSingleUser/:id", getSingleUser);

router.delete("/deleteEmployee/:id", authMiddleware, deleteEmployee);
module.exports = router;
