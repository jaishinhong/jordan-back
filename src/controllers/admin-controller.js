const fs = require("fs");
const cloudinary = require("../config/cloudinary");
const { Product, Size, sequelize, Item, Cart } = require("../models");

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.status(200).json({ products });
    } catch (err) {
        next(err);
    }
};

exports.addProduct = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const stock = JSON.parse(req.body.stock);
        const result = await cloudinary.uploader.upload(req.file.path);
        const image = result.secure_url;
        const createdProduct = await Product.create(
            {
                name: req.body.name,
                price: req.body.price,
                categoryId: req.body.categoryId,
                image
            },
            { transaction: t }
        );
        const productId = createdProduct.id;

        for (let item of stock) {
            await Size.create(
                {
                    productId: productId,
                    name: item.name,
                    quantity: item.quantity
                },
                { transaction: t }
            );
        }

        await t.commit();
        res.status(200).json({ createdProduct });
    } catch (err) {
        next(err);
    } finally {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await cloudinary.uploader.upload(req?.file?.path);
        const image = result.secure_url;

        await Product.update(
            {
                name: req.body.name,
                price: req.body.price,
                categoryId: req.body.categoryId,
                image
            },
            {
                where: {
                    id
                }
            }
        );

        res.status(200).json({ message: "updated successfully" });
    } catch (err) {
        next(err);
    } finally {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
    }
};

exports.updateSize = async (req, res, next) => {
    try {
        const { id, name } = req.params;

        const { quantity } = req.body;

        await Size.update(
            { quantity },
            {
                where: {
                    productId: id,
                    name
                }
            }
        );
        res.status(200).json({ message: "update successfully" });
    } catch (err) {
        next(err);
    }
};

exports.deleteProduct = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        await Size.destroy({ where: { productId: id } }, { transaction: t });
        await Cart.destroy({ where: { productId: id } }, { transaction: t });
        await Item.destroy({ where: { productId: id } }, { transaction: t });
        await Product.destroy({ where: { id } }, { transaction: t });
        await t.commit();
        res.status(200).json({ message: "delete successfully" });
    } catch (err) {
        await t.rollback();
        next(err);
    }
};
