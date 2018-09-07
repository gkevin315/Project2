require("./author");
require("./post");

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

    Category.associate = (models) => {
        Category.hasMany(models.posts, {
            foreignKey: {
                associate: "authorId",
                allowNull: false
            }
        });
    }

    Category.associate = function (models) {
        Category.belongsTo(models.Author, {
            foreignKey: {
                associate: "authorId",
                allowNull: false
            }
        });
    };

    return Category;
};