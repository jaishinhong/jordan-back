module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
        "Category",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {}
    );

    Category.associate = (models) => {
        Category.hasMany(models.Product, {
            foreignKey: {
                name: "CategoryId",
                allowNull: false
            },
            onDelete: "RESTRICT"
        });
    };
    return Category;
};
