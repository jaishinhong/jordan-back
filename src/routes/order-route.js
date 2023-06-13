const express = require("express");
const orderController = require("../controllers/order-controller");
const upload = require("../middlewares/upload");
const router = express.Router();

router.post("/addOrder", orderController.addOrder);
router.get("/getOrders", orderController.getOrders);
router.get("/getOrderById/:id", orderController.getOrderById);
router.get("/getAllOrder", orderController.getAllOrder);
router.put(
    "/addPayment/:id",
    upload.single("receipt"),
    orderController.addPayment
);
router.put("/updateOrderStatus/:id", orderController.updateOrderStatus);
module.exports = router;
