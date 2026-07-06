const { body, validationResult } = require("express-validator");



/**
 * Handle validation errors
 */
const validateRequest = (req, res, next) => {

    const errors = validationResult(req);


    if (!errors.isEmpty()) {

        return res.status(400).json({

            success:false,

            message:"Validation failed",

            errors: errors.array()

        });

    }


    next();

};





/**
 * Signup Validation
 */
const signupValidator = [

    body("organizationName")

        .trim()

        .notEmpty()

        .withMessage(
            "Organization name is required"
        ),



    body("email")

        .trim()

        .isEmail()

        .withMessage(
            "Valid email is required"
        )

        .normalizeEmail(),



    body("password")

        .isLength({
            min:8
        })

        .withMessage(
            "Password must contain minimum 8 characters"
        ),



    validateRequest

];





/**
 * Login Validation
 */
const loginValidator = [

    body("email")

        .trim()

        .isEmail()

        .withMessage(
            "Valid email is required"
        )

        .normalizeEmail(),



    body("password")

        .notEmpty()

        .withMessage(
            "Password is required"
        ),



    validateRequest

];




module.exports = {

    signupValidator,

    loginValidator

};