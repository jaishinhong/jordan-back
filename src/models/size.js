module.exports = (sequelize, DataTypes) => {
    const Size = sequelize.define("Size", {
        name: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Size.associate = (models) => {
        Size.belongsTo(models.Product, {
            foreignKey: {
                name: "ProductId",
                allowNull: false
            },
            onDelete: "RESTRICT"
        });
    };

    return Size;
};
