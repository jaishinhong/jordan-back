const express = require("express");
const orderController = require("../controllers/order-controller");
const router = express.Router();

router.post("/addOrder", orderController.addOrder);
router.get("/getOrders", orderController.getOrders);

module.exports = router;
