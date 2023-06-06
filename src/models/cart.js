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
    return Cart;
};
