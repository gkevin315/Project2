module.exports = function (sequelize, DataTypes) {
    var Category = sequelize.define("category", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 160]
            }, 
            defaultValue: "NOT WORKING"
        }
    });

    Category.associate = function (models) {
        Category.hasMany(models.Post, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    Category.associate = function (models) {
        Category.belongsTo(models.Author, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Category;
};