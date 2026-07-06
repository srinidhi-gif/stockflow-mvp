require("dotenv").config();


const app =
require("./app");


const PORT =
process.env.PORT || 5000;



const productRoutes =
require("./routes/productRoutes");


const dashboardRoutes =
require("./routes/dashboardRoutes");


const settingsRoutes =
require("./routes/settingsRoutes");





app.use(
"/api/products",
productRoutes
);


app.use(
"/api/dashboard",
dashboardRoutes
);


app.use(
"/api/settings",
settingsRoutes
);





app.listen(PORT,()=>{


console.log(
`Server running on port ${PORT}`
);


});