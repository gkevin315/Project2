module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 160]
            }, 
            // defaultValue: "NOT WORKING"
        },
        body: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 160]
            }, 
            // defaultValue: "NOT WORKING"
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