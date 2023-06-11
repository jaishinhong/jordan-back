const { Order, Item, Cart, sequelize, Product } = require("../models");
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
            include: Item
        });
        res.status(200).json({ orders });
    } catch (err) {
        next(err);
    }
};
