const { Product, Size, Category } = require("../models");
const { Op } = require("sequelize");
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

exports.getSearchedProduct = async (req, res, next) => {
    try {
        const { name, categoryId } = req.query;
        if (categoryId !== "undefined") {
            const searchedProducts = await Product.findAll({
                where: {
                    name: { [Op.like]: `%${name}%` },
                    categoryId: categoryId
                }
            });
            res.status(200).json({ searchedProducts });
        } else {
            const searchedProducts = await Product.findAll({
                where: {
                    name: { [Op.like]: `%${name}%` }
                }
            });
            res.status(200).json({ searchedProducts });
        }
    } catch (err) {
        next(err);
    }
};
