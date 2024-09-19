const jwtAuth = require("../middlewares/jwtAuth.js");
const passwordAuth = require("../middlewares/passwordAuth.js");
const express = require("express");
const router = new express.Router();
const functions = require("../controllers/userController.js");

router.post("/addproduct", jwtAuth, functions.addProducts);
router.get("/findproduct", jwtAuth, functions.findProduct);
router.delete("/deleteproduct/:id", functions.deleteProduct);
router.get("/updatefindproduct/:id", jwtAuth, functions.updateFindProduct);
router.put("/updateproduct", jwtAuth, functions.updateProduct);
////authentication
router.post("/signup", functions.signUp);
router.post("/login", functions.login);
//////forget password
router.post("/forget-password", functions.forgetPassword);
router.post("/reset-password", passwordAuth, functions.resetPassword);
//////verify token to enter the reset password page

router.post("/verify-token", passwordAuth, functions.verifyToken);

module.exports = router;
