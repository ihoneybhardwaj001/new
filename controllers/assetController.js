const Sys_Assets = require("../models/assetModel");

// create Asset Details

exports.createAssets = async (req, res) => {
  try {
    const {
      product_description,
      product_type,
      serial_number,
      other_code,
      product_config,
      purchase_date,
      sticker_code,
      alloted_to,
      empl_id,
      allotment_date,
      asset_status,
      remarks,
    } = req.body;

    const newAsset = await Sys_Assets.create({
      product_description,
      product_type,
      serial_number,
      other_code,
      product_config,
      purchase_date,
      sticker_code,
      alloted_to,
      empl_id,
      allotment_date,
      asset_status,
      remarks,
    });

    return res.status(201).json({
      success: true,
      message: "Asset details created successfully",
      newAsset,
    });
  } catch (error) {
    console.log("Error in create asset controller");

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Asset details not created",
    });
  }
};

// get asset deatils by emp_id

exports.getAsset = async (req, res) => {
  try {
    const assets = await Sys_Assets.findAll({
      where: {
        empl_id: req.params.id,
      },
    });

    if (!assets) {
      return res.status(404).json({
        success: false,
        message: "Asset detail not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: assets,
    });
  } catch (error) {
    console.log("Error in get single asset details asset controller");

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Assets not fetched",
    });
  }
};

exports.getAssets = async (req, res) => {
  try {
    // Assuming Sys_Assets is a Sequelize model
    const assets = await Sys_Assets.findAll();
    return res.status(200).json({
      success: true,
      data: assets,
    });
  } catch (error) {
    console.log("Error in get asset controller");
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "All Assets not fetched",
    });
  }
};

// UPDATE ASSET DETAILS

exports.updateAsset = async (req, res) => {
  try {
    const assetToUpdate = await Sys_Assets.findAll({
      where: {
        serial_number: req.params.id,
      },
    });

    if (!assetToUpdate) {
      return res.status(404).json({
        success: false,
        message:
          "Their is no employee exist with that id which have asset alloted",
      });
    }

    // Update each asset individually
    for (const asset of assetToUpdate) {
      await asset.update(req.body);
    }

    res.status(201).json({
      success: true,
      message: "Employee Asset detail updated successfully",
      data: assetToUpdate,
    });
  } catch (error) {
    console.log("Error in update asset controller");

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Asset not updated",
    });
  }
};

// Delete Asset Details

exports.deleteAsset = async (req, res) => {
  try {
    const asset = await Sys_Assets.findOne({
      where: {
        serial_number: req.params.id,
      },
    });

    if (!asset) {
      res.status(404).json({
        success: false,
        message: "Their is no asset exist with that id",
      });
    }

    // Delete Asset Deatils
    await asset.destroy(req.body);

    return res.status(200).json({
      success: true,
      data: null,
      message:
        "Asset details for that asset SERIAL NUMBER deleted successfully",
    });
  } catch (error) {
    console.log("Error in delete asset controller");

    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Asset not deleted",
    });
  }
};
