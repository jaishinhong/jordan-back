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
                name: "OrderId",
                allowNull: false
            },
            onDelete: "RESTRICT"
        });
    };
    Item.associate = (models) => {
        Item.belongsTo(models.Product, {
            foreignKey: {
                name: "ProductId",
                allowNull: false
            },
            onDelete: "RESTRICT"
        });
    };
    return Item;
};
