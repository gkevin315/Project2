module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 160]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1, 160]
            }
        },

        category: {
            type: DataTypes.STRING,
            defaultValue: "Personal"
        }

    });

    Post.associate = function (models) {
        Post.belongsTo(models.category, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    Post.associate = function (models) {
        Post.belongsTo(models.Author, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Post;
};