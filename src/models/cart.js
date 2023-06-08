module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define(
        "Cart",
        {
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            size: {
                type: DataTypes.FLOAT,
                allowNull: false
            }
        },
        {}
    );

    Cart.associate = (models) => {
        Cart.belongsTo(models.User, {
            foreignKey: {
                name: "userId",
                allowNull: false
            },
            onDelete: "RESTRICT"
        });
    };

    Cart.associate = (models) => {
        Cart.belongsTo(models.Product, {
            foreignKey: {
                name: "productId",
                allowNull: false
            },
            onDelete: "RESTRICT"
        });
    };

    return Cart;
};
