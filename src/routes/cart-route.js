const express = require("express");

const cartController = require("../controllers/cart-controller");

const router = express.Router();

router.post("/addCart", cartController.addCart);
router.get("/getCartsByUser", cartController.getCartsByUser);
router.delete("/deleteCart/:id", cartController.deleteCart);
router.delete("/deleteCartByUser", cartController.deleteCartByUser);

module.exports = router;
