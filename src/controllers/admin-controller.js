const fs = require("fs");
const cloudinary = require("../config/cloudinary");
const { Product, Size, sequelize } = require("../models");

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

        for (let item of stock) {
            await Size.create({
                productId: item.productId,
                name: item.name,
                quantity: item.quantity
            });
        }

        await t.commit();
        res.status(200).json({ createdProduct });
    } catch (err) {
        await t.rollback();
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

        const result = await cloudinary.uploader.upload(req.file.path);
        const image = result.secure_url;
        const updatedProduct = await Product.update(
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
    }
};

// exports.updateSize = async (req, res, next) => {
//     const id = req.params.id;
//     const {name, quantity} = req.body;

//     await Size.update({name}, {
//         where: {
//             productId: req.params
//         }
//     });
// };
