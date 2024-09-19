const ProductModel = require("../models/productModels.js");
const UserModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

class functions {
  /////////////ADD PRODUCT/////////////
  static addProducts = async (req, res) => {
    const { name, price, category, company } = req.body;

    if (!name || !price || !category || !company) {
      res.status(400).json({ status: 400, message: "Please fill full form" });
    } else {
      let product = await ProductModel.create({
        name,
        price,
        category,
        company,
        userId: req.userId,
      });

      res
        .status(201)
        .json({ status: 201, message: "Product created successfully" });
    }
  };
  /////////FIND OR READ PRODUCT////////
  static findProduct = async (req, res) => {
    try {
      let products = await ProductModel.find({ userId: req.userId });

      res.status(200).json({ status: 200, products });
    } catch (error) {
      res.status(500).json({ status: 500, message: "Error fetching Products" });
    }
  };
  ////////DELETE PRODUCT//////////////
  static deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      let result = await ProductModel.deleteOne({ _id: id });
      if (result.deletedCount === 1) {
        res
          .status(200)
          .json({ status: 200, message: "Product deleted successfully." });
      }
    } catch (error) {
      res.status(500).json({ status: 500, message: "Internal Server Problem" });
    }
  };
  ////UPDATE READ PRODUCT/////////
  static updateFindProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ProductModel.findById(id);
      res.status(200).json({ status: 200, product });
    } catch (error) {
      res.status(500).json({ status: 500, message: "Internal server problem" });
    }
  };
  /////UPDATE PRODUCT//////////
  static updateProduct = async (req, res) => {
    const { name, price, category, company, id } = req.body;

    try {
      if (!name || !price || !category || !company) {
        res
          .status(400)
          .json({ status: 400, message: "Please fill fulll form" });
      } else {
        let response = await ProductModel.findByIdAndUpdate(
          { _id: id },
          { $set: { name, price, category, company } }
        );
        if (response) {
          res.status(201).json({ status: 201, message: "Update Successfull" });
        }
      }
    } catch (error) {
      res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
  };

  ///////////////FOR AUTHENTICATIONS///////////
  ////////////////////////////////////////////
  ///////////////////////////////////////////

  /////////SIGNUP///////////
  static signUp = async (req, res) => {
    const { name, email, password, cpassword } = req.body;

    try {
      if (!name || !email || !password || !cpassword) {
        return res
          .status(400)
          .json({ status: 400, message: "Please fill full form" });
      } else {
        let result = await UserModel.findOne({ email });
        console.log(result);

        if (result) {
          return res
            .status(409)
            .json({ status: 409, message: "User already exists" });
        } else {
          if (password !== cpassword) {
            return res.status(400).json({
              status: 400,
              message: "Password and Confirm Password not match",
            });
          } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            let user = await UserModel.create({
              name,
              email,
              password: hashedPassword,
            });
            console.log(user);
            return res
              .status(201)
              .json({ status: 201, message: "Registration successfull" });
          }
        }
      }
    } catch (error) {
      return res
        .status(500)
        .json({ status: 500, message: "Internal Server Error" });
    }
  };
  //////////////LOGIN////////////
  static login = async (req, res) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        console.log(req.body);
        return res
          .status(400)
          .json({ status: 400, message: "Please fill full form" });
      }

      let result = await UserModel.findOne({ email });

      // Check if result is null or undefined before comparing password
      if (!result) {
        console.log("zzz", result); // This will log undefined or null
        return res
          .status(404)
          .json({ status: 404, message: "User not Exists" });
      }

      let comparedPassword = await bcrypt.compare(password, result.password);

      console.log("User found:", result);

      if (!comparedPassword) {
        return res
          .status(401)
          .json({ status: 401, message: "Invalid Email or Password" });
      }

      let token = jwt.sign({ userId: result._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });

      return res
        .status(200)
        .json({ status: 200, message: "Login Successful", token });
    } catch (error) {
      console.error("Error in login:", error);
      return res
        .status(500)
        .json({ status: 500, message: "Internal Server Error" });
    }
  };
  //////////////RESET PASSWORD////////////
  static forgetPassword = async (req, res) => {
    const { email } = req.body;

    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res
          .status(404)
          .json({ status: 404, message: "Email not found" });
      } else {
        const token = jwt.sign(
          { userId: user._id },
          process.env.FORGET_SECRET_KEY,
          { expiresIn: "1d" }
        );

        const createTransport = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.USER_EMAIL,
          to: user.email,
          subject: "Password Reset Request",
          text: `You have requested to reset your password. 
          Please click the following link to reset your password: 
          http://localhost:3000/reset-password/${token}`,
        };

        createTransport.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log("hh", err);

            return res
              .status(404)
              .json({ status: 404, message: "Error while sending Email" });
          }
          return res
            .status(200)
            .json({ status: 200, message: "Reset Email sent successfully" });
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ status: 500, message: "Internal server error", error });
    }
  };
  static resetPassword = async (req, res) => {
    const { password, cpassword } = req.body;

    if (!password || !cpassword) {
      res.set("Content-Type", "application/json");
      return res
        .status(400)
        .send({ status: 400, message: "Please filll full form" });
    } else {
      if (password === cpassword) {
        let hashedPassword = await bcrypt.hash(password, 10);
        const response = await UserModel.findByIdAndUpdate(req.userId, {
          $set: { password: hashedPassword },
        });

        res
          .status(200)
          .json({ status: 200, message: "Password changed successfully" });
      } else {
        res.status(400).json({
          status: 400,
          message: "Password and Confirm Password not match.",
        });
      }
    }
  };
  /////////VERIFY TOKEN TO ENTER THE RSET-PASSWORD PAGE/////
  static verifyToken = (req, res) => {
    console.log('yhhhh');
    
    if (req.userId) {
    return  res.status(200).json({ status: 200, message: "ok" });
    }
  };
}

module.exports = functions;
