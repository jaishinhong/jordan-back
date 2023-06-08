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
                name: "ProductId",
                allowNull: false
            },
            onDelete: "RESTRICT"
        });
    };

    Product.associate = (models) => {
        Product.belongsTo(models.Category, {
            foreignKey: {
                name: "CategoryId",
                allowNull: false
            },
            onDelete: "RESTRICT"
        });
    };

    Product.associate = (models) => {
        Product.hasMany(models.Size, {
            foreignKey: {
                name: "ProductId",
                allowNull: false
            },
            onDelete: "RESTRICT"
        });
    };

    Product.associate = (models) => {
        Product.hasMany(models.Cart, {
            foreignKey: {
                name: "ProductId",
                allowNull: false
            },
            onDelete: "RESTRICT"
        });
    };
    return Product;
};
