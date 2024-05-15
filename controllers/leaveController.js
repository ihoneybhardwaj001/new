const Leave = require("../models/leaveModel");

// create leave

exports.createLeave = async (req, res) => {
  try {
    const { casual_leave, onDuty_leave, withoutPay_leave, empl_id } = req.body;

    const newLeave = await Leave.create({
      casual_leave,
      onDuty_leave,
      withoutPay_leave,
      empl_id,
    });

    return res.status(201).json({
      success: true,
      message: "New Leave Created",
      newLeave,
    });
  } catch (error) {
    console.log("Error in create leave controller");

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Leave is not created",
    });
  }
};

// get all employee details

exports.getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.findAll();

    return res.status(200).json({
      success: true,
      data: leaves,
    });
  } catch (error) {
    console.log("Error in get leave controller");

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Leaves not fetched",
    });
  }
};

// get single employee Leave details

exports.getLeave = async (req, res) => {
  try {
    const leave = await Leave.findOne({
      where: {
        empl_id: req.params.id,
      },
    });

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave details for given employee id is not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Leave details for employee id",
      data: leave,
    });
  } catch (error) {
    console.log("Error in get single employee leave controller");

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Leave not fetched",
    });
  }
};

// update employee leave deatils

exports.updateLeave = async (req, res) => {
  try {
    const leave = await Leave.findOne({
      where: {
        empl_id: req.params.id,
      },
    });

    if (!leave) {
      return res.status(400).json({
        success: false,
        message: "Leave details for this employee id is not found",
      });
    }

    // update leave
    await leave.update(req.body);

    return res.status(201).json({
      success: true,
      data: leave,
      message: "leave updated successfully",
    });
  } catch (error) {
    console.log("Error in update employee leave controller");

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Leave not updated",
    });
  }
};

// delete leave details

exports.deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findOne({
      where: {
        empl_id: req.params.id,
      },
    });

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave details for this employee id is not found",
      });
    }

    // leave delete
    await leave.destroy(req.body);

    return res.status(201).json({
      success: true,
      data: leave,
      message: "Leave details for employee id is deleted successfully",
    });
  } catch (error) {
    console.log("Error in delete employee leave controller");

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Leave not deleted",
    });
  }
};
