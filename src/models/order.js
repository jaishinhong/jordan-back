module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {});

    Order.associate = (models) => {
        Order.belongsTo(models.User, {
            foreignKey: {
                name: "UserId",
                allowNull: false
            },
            onDelete: "RESTRICT"
        });
    };

    Order.associate = (models) => {
        Order.hasMany(models.Item, {
            foreignKey: {
                name: "OrderId",
                allowNull: false
            },
            onDelete: "RESTRICT"
        });
    };
    return Order;
};