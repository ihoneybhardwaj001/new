const { createLeave, getLeaves, getLeave, updateLeave, deleteLeave} = require("../controllers/leaveController");
const { isAuth } = require("../middleware/auth");

const router = require("express").Router();

router.post("/", createLeave);

router.get("/", getLeaves);

router.get("/:id", getLeave);

router.put("/:id", isAuth, updateLeave);

router.delete("/:id", isAuth, deleteLeave);

module.exports = router;