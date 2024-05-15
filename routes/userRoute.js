const express = require("express");
const { isAuth, isAdmin } = require("../middleware/auth");
const {
  createAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/adminController");

const {
  createEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const { loginUser } = require("../controllers/loginController");

const router = express.Router();

// Admin Routes
router.post("/admin", createAdmin);
router.get("/admin", getAdmins);
router.get("/admin/:id", getAdmin);
router.put("/admin/:id", isAuth, isAdmin, updateAdmin);
router.delete("/admin/:id", isAuth, isAdmin, deleteAdmin);

// Employee Routes
router.post("/employee", isAuth, isAdmin, createEmployee);
router.get("/employee", isAuth, isAdmin, getEmployees);
router.get("/employee/:id", isAuth, isAdmin, getEmployee);
router.put("/employee/:id", isAuth, isAdmin, updateEmployee);
router.delete("/employee/:id", isAuth, isAdmin, deleteEmployee);

router.post("/login", loginUser);

module.exports = router;
