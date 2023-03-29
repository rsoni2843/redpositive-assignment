const UserController = require("../controller/user.controller");

const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Checking Home Route");
});
router.get("/users", UserController.getUsers);
router.post("/users", UserController.postUser);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);
router.post("/email", UserController.sendEmail);

module.exports = router;
