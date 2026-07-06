const express = require("express");

const router = express.Router();



const {

    signup,

    login,

    getProfile

} = require("../controllers/authController");



const {
    protect
} = require("../middleware/authMiddleware");



const {

    signupValidator,

    loginValidator

} = require("../middleware/validateAuth");





router.post(

    "/signup",

    signupValidator,

    signup

);



router.post(

    "/login",

    loginValidator,

    login

);



router.get(

    "/profile",

    protect,

    getProfile

);



module.exports = router;