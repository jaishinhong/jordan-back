module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.ENUM("customer", "admin"),
                defaultValue: "customer"
            },
            address: {
                type: DataTypes.STRING
            },
            mobile: {
                type: DataTypes.STRING,
                unique: true,
                validate: {
                    is: /^[0-9]{10}$/
                }
            }
        },
        {
            underscored: true
        }
    );

    User.associate = (models) => {
        User.hasMany(models.Order, {
            foreignKey: {
                name: "userId",
                allowNull: false
            },
            onDelete: "RESTRICT"
        });
        User.hasMany(models.Cart, {
            foreignKey: {
                name: "userId",
                allowNull: false
            },
            onDelete: "RESTRICT"
        });
    };

    return User;
};
