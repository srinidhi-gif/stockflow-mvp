const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");


const errorMiddleware =
require("./middleware/errorMiddleware");


const app = express();



app.use(cors());


app.use(express.json());




// Health check

app.get("/",(req,res)=>{


    res.json({

        message:
        "StockFlow Backend Running 🚀"

    });


});




// Routes

app.use(
    "/api/auth",
    authRoutes
);




// Product routes loaded in server.js
// Dashboard routes loaded in server.js
// Settings routes loaded in server.js




// 404 Handler

app.use(
(req,res,next)=>{


    res.status(404).json({

        success:false,

        message:
        `Route ${req.originalUrl} not found`

    });


});




// Global Error Handler

app.use(errorMiddleware);



module.exports = app;