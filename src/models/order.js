module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        status: {
            type: DataTypes.ENUM(
                "pending",
                "approved",
                "shipping",
                "delivered"
            ),
            defaultValue: "pending"
        }
    });

    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            foreignKey: {
                name: "userId",
                allowNull: false
            },
            onDelete: "RESTRICT"
        });
        Order.hasMany(models.Item, {
            foreignKey: {
                name: "orderId",
                allowNull: false
            },
            onDelete: "RESTRICT"
        });
    };

    return Order;
};
