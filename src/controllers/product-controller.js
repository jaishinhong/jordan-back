const { Product, Size, Category } = require("../models");
exports.getAllProduct = async (req, res, next) => {
    try {
        const products = await Product.findAll({
            include: Size
        });
        res.status(200).json({ products });
    } catch (err) {
        next(err);
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ where: { id }, include: Size });
        res.status(200).json({ product });
    } catch (err) {
        next(err);
    }
};

exports.getProductByCategoryId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const products = await Product.findAll({
            where: { categoryId: id },
            include: {
                model: Category
            }
        });
        res.status(200).json({ products });
    } catch (err) {
        next(err);
    }
};
