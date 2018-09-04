module.exports = function (sequelize, DataTypes) {
    var Category = sequelize.define("Post", {
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
        Category.belongsTo(models.Post, {
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