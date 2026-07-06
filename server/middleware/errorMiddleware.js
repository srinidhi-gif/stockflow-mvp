const ApiError = require("../utils/ApiError");


const errorMiddleware = (
    err,
    req,
    res,
    next
)=>{


    let error = {...err};


    error.message = err.message;



    console.error(
        "ERROR:",
        err
    );



    // ===========================
    // Prisma Errors
    // ===========================


    if(err.code === "P2002"){


        error =
        new ApiError(
            400,
            "Duplicate value already exists"
        );


    }



    if(err.code === "P2025"){


        error =
        new ApiError(
            404,
            "Record not found"
        );


    }




    // ===========================
    // JWT Errors
    // ===========================


    if(err.name === "JsonWebTokenError"){


        error =
        new ApiError(
            401,
            "Invalid token"
        );


    }




    if(err.name === "TokenExpiredError"){


        error =
        new ApiError(
            401,
            "Token expired"
        );


    }





    // ===========================
    // Default Error
    // ===========================


    const statusCode =
    error.statusCode || 500;



    const message =
    error.message ||
    "Internal Server Error";





    return res
    .status(statusCode)
    .json({

        success:false,

        message,

        ...(process.env.NODE_ENV==="development" && {

            stack:err.stack

        })

    });


};


module.exports =
errorMiddleware;