const UserModel = require("../model/user.model");

class UserController {
  static getUsers = async (req, res) => {
    try {
      const users = await UserModel.find();
      res.send(users);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  };

  static postUser = async (req, res) => {
    try {
      const user = new UserModel(req.body);
      const savedUser = await user.save();
      res.send(savedUser);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  };
  static deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserModel.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.send(user);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  };

  static updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.send(user);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  };
}

module.exports = UserController;
