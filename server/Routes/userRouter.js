const express = require("express");
const {
  getAllUsers,
  login,
  forgetPassword,
  resetPassword,
  deleteUser,
  verify,
  getActiveUsers,
  logoutUser,
} = require("../controller/userController");

const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
router.get("/verify", authMiddleware, verify);
router.get("/getAllUsers", getAllUsers);
//post

router.post("/login", login);
router.post("/logout/:id", authMiddleware, logoutUser);
router.get("/active", authMiddleware, getActiveUsers);

router.post("/forgetPassword/:id", forgetPassword);
router.post("/resetPassword/:id", resetPassword);

//delete

router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
