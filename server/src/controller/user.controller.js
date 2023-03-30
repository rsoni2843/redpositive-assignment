require("dotenv").config();
const UserModel = require("../model/user.model");
const nodemailer = require("nodemailer");

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
      console.log(req.body);
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
  // Send user data to email
  static sendEmail = async(req, res) => {
    const selectedUsers = req.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // generated gmail user
        pass: process.env.EMAIL_PASS, // generated gmail password
      },
    });
    const mailOptions = {
      from: "2rsoni2843@gmail.com",
      to: "rsoni2843@gmail.com",
      subject: "Selected Users Data",
      html: "<p>" + JSON.stringify(selectedUsers) + "</p>",
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.send("Email sent successfully");
  };
}

module.exports = UserController;
