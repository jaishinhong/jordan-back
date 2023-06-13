const { Order, Item, Cart, sequelize, Product, User } = require("../models");
const cloudinary = require("../config/cloudinary");
exports.addOrder = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const userId = req.user.id;
        const order = await Order.create({ userId }, { transaction: t });
        const cart = await Cart.findAll(
            { where: { userId }, include: Product },
            { transaction: t }
        );

        for (let item of cart) {
            await Item.create(
                {
                    amount: item.amount,
                    price: item.Product.price,
                    size: item.size,
                    orderId: order.id,
                    productId: item.productId
                },
                { transaction: t }
            );
        }
        await t.commit();
        res.status(200).json({ message: "add successfully" });
    } catch (err) {
        await t.rollback();
        next(err);
    }
};

exports.getOrders = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const orders = await Order.findAll({
            where: { userId },
            include: {
                model: Item,
                include: Product
            }
        });
        res.status(200).json({ orders });
    } catch (err) {
        next(err);
    }
};

exports.getOrderById = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const order = await Order.findOne({
            where: { userId, id },
            include: {
                model: Item,
                include: Product
            }
        });
        res.status(200).json({ order });
    } catch (err) {
        next(err);
    }
};

exports.getAllOrder = async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            include: { model: Item, include: Product }
        });
        res.status(200).json({ orders });
    } catch (err) {
        next(err);
    }
};

exports.addPayment = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { address } = req.body;
        console.log(address);
        let receipt = await cloudinary.uploader.upload(req.file.path);
        receipt = receipt.secure_url;

        await User.update({ address }, { where: { id: userId } });
        await Order.update({ receipt }, { where: { id } });
        res.status(200).json({ message: "add successfully" });
    } catch (err) {
        next(err);
    } finally {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
    }
};

exports.updateOrderStatus = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const { status } = req.body;
        await Order.update({ status }, { where: { id: orderId } });
        res.status(200).json({ message: "updated complete" });
    } catch (err) {
        next(err);
    }
};
