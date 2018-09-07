module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 40]
            }, 
            defaultValue: "NOT WORKING"
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1, 160]
            }, 
            defaultValue: "NOT WORKING"
        },

        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 20]
            },
            // defaultValue: "Personal"
        }

    });

    Post.associate = function (models) {
        Post.hasOne(models.Category, {
            constraints: false,
            // foreignKey: {
            //     allowNull: true
            // }
        });
        Post.belongsTo(models.Author, {
            foreignKey: 'AuthorId'
        });
    };

    return Post;
};