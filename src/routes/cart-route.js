const express = require("express");

const cartController = require("../controllers/cart-controller");

const router = express.Router();

router.post("/addCart", cartController.addCart);
router.get("/getCartsByUser", cartController.getCartsByUser);
router.delete("/deleteCart/:id", cartController.deleteCart);
router.delete("/deleteCartByUser", cartController.deleteCartByUser);
router.patch("/increaseQuantity/:id", cartController.increaseQuantity);
router.patch("/decreaseQuantity/:id", cartController.decreaseQuantity);

module.exports = router;
