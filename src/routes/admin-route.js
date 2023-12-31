const express = require("express");
const upload = require("../middlewares/upload");
const adminSerivce = require("../controllers/admin-controller");

const router = express.Router();

router.post("/addProduct", upload.single("image"), adminSerivce.addProduct);
router.get("/getProducts", adminSerivce.getProducts);
router.put(
    "/updateProduct/:id",
    upload.single("image"),
    adminSerivce.updateProduct
);
router.put("/updateQuantity/:id/:name", adminSerivce.updateSize);
router.delete("/deleteProduct/:id", adminSerivce.deleteProduct);
module.exports = router;
