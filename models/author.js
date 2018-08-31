module.exports = function (sequelize, DataTypes) {
  var Author = sequelize.define("Author", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });

  Author.associate = function (models) {
    Author.hasMany(models.Post, {
      onDelete: "cascade"
    });
  };

  return Author;
};
