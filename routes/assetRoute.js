const { createAssets, getAssets, getAsset, updateAsset, deleteAsset} = require('../controllers/assetController');


const router = require("express").Router();

router.post("/", createAssets);
router.get("/", getAssets)
router.get("/:id", getAsset);
router.put("/:id", updateAsset);
router.delete("/:id", deleteAsset)

module.exports = router;
