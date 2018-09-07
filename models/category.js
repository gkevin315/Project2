require("./author");
require("./post");

module.exports = function (sequelize, DataTypes) {
    var Category = sequelize.define("Category", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 20]
            }, 
            defaultValue: "NOT WORKING"
        }
    });

    Category.associate = (models) => {
        Category.hasMany(models.Post, {
            constraints: false,
            // foreignKey: {
            //     associate: "authorId",
            //     constraints: false,
            //     allowNull: true
            // }
        });
        Category.belongsTo(models.Author, {
            // foreignKey: {
            //     associate: "authorId",
            //     allowNull: false
            // }
        });
    }

    return Category;
};