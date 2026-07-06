const express = require("express");

const router = express.Router();



const {

    createProduct,

    getProducts,

    getProductById,

    updateProduct,

    deleteProduct,

    getLowStockProducts

} = require("../controllers/productController");



const {
    protect
} = require("../middleware/authMiddleware");



const {

    productValidator

} = require("../middleware/validateProduct");





router.post(

    "/",

    protect,

    productValidator,

    createProduct

);



router.get(

    "/",

    protect,

    getProducts

);



router.get(

    "/low-stock",

    protect,

    getLowStockProducts

);



router.get(

    "/:id",

    protect,

    getProductById

);



router.put(

    "/:id",

    protect,

    productValidator,

    updateProduct

);



router.delete(

    "/:id",

    protect,

    deleteProduct

);



module.exports = router;