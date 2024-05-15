const Employee = require("../models/userModel");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { Op } = require("sequelize");

// create employee

exports.createEmployee = async (req, res) => {
  try {
    const {
      user_id,
      email,
      password,
      role,
      name,
      phoneNo,
      profile,
      gender,
      DOJ,
      permanentAddress,
      localAddress,
    } = req.body;

    // check if employee already exist

    const existingEmployee = await Employee.findOne({
      where: {
        [Op.or]: [{ email: email }, { user_id: user_id }],
      },
    });

    if (existingEmployee) {
      res.status(400).json({
        success: false,
        message: "Employee already Exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newEmployee = await Employee.create({
      user_id,
      email,
      password: hashPassword,
      role,
      name,
      phoneNo,
      profile,
      gender,
      DOJ,
      permanentAddress,
      localAddress,
    });

    return res.status(201).json({
      success: true,
      message: "New Employee Created",
      newEmployee,
    });
  } catch (error) {
    console.log("Error in create employee controller");

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Employee no created",
    });
  }
};

// get all employee

exports.getEmployees = async (req, res) => {
  try {
    // Fetch employee where role is 'employee'
    const employees = await Employee.findAll({
      where: {
        role: "employee",
      },
    });
    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    // Handle error

    console.log("Error in get employee controller");

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Employee not fetched",
    });
  }
};

// get single employee

exports.getEmployee = async (req, res) => {
  try {
    const employees = await Employee.findOne({
      where: {
        user_id: req.params.id,
      },
    });

    if (!employees) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    console.log("Error in get single employee controller");

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Employee not fetched",
    });
  }
};

// update employee

exports.updateEmployee = async (req, res) => {
  try {
    const employees = await Employee.findOne({
      where: {
        user_id: req.params.id,
      },
    });

    if (!employees) {
      return res.status(404).json({
        success: false,
        message: "employee not found",
      });
    }

    // update employee
    await employees.update(req.body);

    return res.status(201).json({
      success: true,
      data: employees,
      message: "Employee updated successfully",
    });
  } catch (error) {
    console.log("Error in update employee controller");

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Employee not updated",
    });
  }
};

// delete employee

exports.deleteEmployee = async (req, res) => {
  try {
    const employees = await Employee.findOne({
      where: {
        user_id: req.params.id,
      },
    });

    if (!employees) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    // Delete the Employee
    await employees.destroy();

    return res.status(201).json({
      success: true,
      data: null,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.log("Error in delete employee controller");

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Employee not deleted",
    });
  }
};
