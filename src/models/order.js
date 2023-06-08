module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        status: {
            type: DataTypes.ENUM("pending", "approved", "waiting", "success")
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
    };

    Order.associate = (models) => {
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
