const express = require("express");
const router = express.Router();
const { getTasks, createTask, updateTask, patchTask, deleteTask , getTaskById} = require("../controllers/task");

const auth = require("../middlewares/auth");

router.get("/", getTasks);
router.post("/",auth, createTask);
router.put("/:id",auth, updateTask);
router.patch("/:id",auth, patchTask);
router.delete("/:id",auth, deleteTask);
router.get("/:id",auth, getTaskById);

module.exports = router;    