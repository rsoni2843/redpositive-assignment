const UserController = require("../controller/user.controller");

const express = require("express");

const router = express.Router();

router.post("/users", UserController.postUser);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);
router.post("/email", UserController.sendEmail);
router.get("/users", UserController.getUsers);

module.exports = router;
