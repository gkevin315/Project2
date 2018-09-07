require("./category");
require("./post");
module.exports = function (sequelize, DataTypes) {
  var Author = sequelize.define("Author", {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING
  });

  Author.associate =  models => {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Author.hasMany(models.Post, {
      onDelete: "cascade",
      // foreignKey: 'authorId'
    });
  };

  // var Category = sequelize.define("Category", {
  //   name: DataTypes.STRING
  // });

  // Category.associate = function (models) {
  //   Category.hasMany(models.Post)
  // };
  return Author;
};
