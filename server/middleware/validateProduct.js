const {
    body,
    validationResult

} = require("express-validator");





const validateProductRequest = (req,res,next)=>{


    const errors =
    validationResult(req);



    if(!errors.isEmpty()){


        return res.status(400).json({

            success:false,

            message:"Validation failed",

            errors:errors.array()

        });


    }


    next();


};







const productValidator = [


    body("name")

        .trim()

        .notEmpty()

        .withMessage(
            "Product name is required"
        ),




    body("sku")

        .trim()

        .notEmpty()

        .withMessage(
            "SKU is required"
        ),




    body("quantity")

        .isInt({
            min:0
        })

        .withMessage(
            "Quantity must be zero or greater"
        ),





    body("costPrice")

        .optional()

        .isFloat({
            min:0
        })

        .withMessage(
            "Cost price must be positive"
        ),





    body("sellingPrice")

        .optional()

        .isFloat({
            min:0
        })

        .withMessage(
            "Selling price must be positive"
        ),





    body("lowStockThreshold")

        .optional()

        .isInt({
            min:0
        })

        .withMessage(
            "Low stock threshold must be positive"
        ),



    validateProductRequest

];





module.exports = {

    productValidator

};