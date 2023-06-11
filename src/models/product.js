module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        "Product",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            image: {
                type: DataTypes.STRING
            }
        },
        {}
    );

    Product.associate = (models) => {
        Product.hasMany(models.Item, {
            foreignKey: {
                name: "productId",
                allowNull: false
            },
            onDelete: "RESTRICT"
        });
        Product.belongsTo(models.Category, {
            foreignKey: {
                name: "categoryId",
                allowNull: false
            },
            onDelete: "RESTRICT"
        });
        Product.hasMany(models.Size, {
            foreignKey: {
                name: "productId",
                allowNull: false
            },
            onDelete: "RESTRICT"
        });
        Product.hasMany(models.Cart, {
            foreignKey: {
                name: "productId",
                allowNull: false
            },
            onDelete: "RESTRICT"
        });
    };
    return Product;
};
