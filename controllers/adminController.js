const Admin = require("../models/userModel");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { Op } = require("sequelize");

// create admin

exports.createAdmin = async (req, res) => {
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

    // check if admin already exist

    const existingAdmin = await Admin.findOne({
      where: {
        [Op.or]: [{ email: email }, { user_id: user_id }],
      },
    });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already Exist",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
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
      message: "New Admin Created",
      newAdmin,
    });
  } catch (error) {
    console.log("Error in create admin controller");

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Admin not created",
    });
  }
};

// get all admin

exports.getAdmins = async (req, res) => {
  try {
    // Fetch admins where role is 'admin'
    const admins = await Admin.findAll({
      where: {
        role: "admin",
      },
    });
    return res.status(200).json({
      success: true,
      data: admins,
    });
  } catch (error) {
    // Handle error
    console.log("Error in get admin controller");

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Admin not fetched",
    });
  }
};

// get single Admin

exports.getAdmin = async (req, res) => {
  try {
    const admins = await Admin.findOne({
      where: {
        user_id: req.params.id,
      },
    });

    if (!admins) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: admins,
    });
  } catch (error) {
    console.log("Error in get single admin controller");

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Admin not fetched",
    });
  }
};

// update Admin

exports.updateAdmin = async (req, res) => {
  try {
    const admins = await Admin.findOne({
      where: {
        user_id: req.params.id,
      },
    });

    if (!admins) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // update the admin
    await admins.update(req.body);

    return res.status(201).json({
      success: true,
      data: admins,
      message: "Admin updated successfully",
    });
  } catch (error) {
    console.log("Error in update admin controller");

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Admin not updated",
    });
  }
};

// delete Admin

exports.deleteAdmin = async (req, res) => {
  try {
    const admins = await Admin.findOne({
      where: {
        user_id: req.params.id,
      },
    });

    if (!admins) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Delete the Admin
    await admins.destroy();

    return res.status(201).json({
      success: true,
      data: null,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    console.log("Error in delete admin controller");

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Admin not deleted",
    });
  }
};
