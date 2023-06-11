require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");
const authRoute = require("./routes/auth-route");
const adminRoute = require("./routes/admin-route");
const authenticate = require("./middlewares/authenticate");
const productRoute = require("./routes/product-route");
const cartRoute = require("./routes/cart-route");
const orderRoute = require("./routes/order-route");

const app = express();

app.use(cors());
// app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //convert request body to object

app.use("/auth", authRoute);
app.use("/product", productRoute);
app.use("/admin", authenticate, adminRoute);
app.use("/cart", authenticate, cartRoute);
app.use("/order", authenticate, orderRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
