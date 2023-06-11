module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define(
        "Item",
        {
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            price: {
                type: DataTypes.STRING,
                allowNull: false
            },
            size: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {}
    );

    Item.associate = (models) => {
        Item.belongsTo(models.Order, {
            foreignKey: {
                name: "orderId",
                allowNull: false
            },
            onDelete: "RESTRICT"
        });
        Item.belongsTo(models.Product, {
            foreignKey: {
                name: "productId",
                allowNull: false
            },
            onDelete: "RESTRICT"
        });
    };

    return Item;
};
