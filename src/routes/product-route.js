const express = require("express");
const productController = require("../controllers/product-controller");

const router = express.Router();

router.get("/getAllProduct", productController.getAllProduct);
router.get("/getProductById/:id", productController.getProductById);
router.get(
    "/getProductByCategoryId/:id",
    productController.getProductByCategoryId
);
router.get("/getSearchedProduct", productController.getSearchedProduct);

module.exports = router;
