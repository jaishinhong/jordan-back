const express = require("express");
const upload = require("../middlewares/upload");
const adminSerivce = require("../controllers/admin-controller");

const router = express.Router();

router.post("/addProduct", upload.single("image"), adminSerivce.addProduct);
router.put(
    "/updateProduct/:id",
    upload.single("image"),
    adminSerivce.updateProduct
);
// router.put("/updateSize/:id", adminSerivce.updateSize);
module.exports = router;
