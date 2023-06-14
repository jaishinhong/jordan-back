const { Cart, Product } = require("../models");

exports.addCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { size, productId, amount } = req.body;
        const result = await Cart.create({
            size,
            productId,
            amount,
            userId
        });
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

exports.getCartsByUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await Cart.findAll({
            where: { userId },
            include: Product
        });
        res.status(200).json({ result });
    } catch (err) {
        next(err);
    }
};

exports.deleteCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const id = req.params.id;

        await Cart.destroy({
            where: {
                userId,
                id
            }
        });
        res.status(200).json({ message: "delete successfully" });
    } catch (err) {
        next(err);
    }
};

exports.deleteCartByUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        // console.log(
        //     userId,
        //     "hellooooooooooooooooooooooooooooooooooooooooooooooooooooooo"
        // );
        await Cart.destroy({ where: { userId } });
        res.status(200).json({ message: "delete sucessfully" });
    } catch (err) {
        next(err);
    }
};
