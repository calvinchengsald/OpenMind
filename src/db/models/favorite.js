'use strict';
module.exports = (sequelize, DataTypes) => {
  var Favorite = sequelize.define('Favorite', {
    userId: {
      type : DataTypes.INTEGER,
      allowNull: false
    },
    postId: {
      type : DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Favorite.associate = function(models) {
    // associations can be defined here
    Favorite.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    Favorite.belongsTo(models.Post, {
      foreignKey: "postId",
      onDelete: "CASCADE"
    });
    Favorite.addScope("allFovoritesFor", (userId) => {
      return {
        include: [{
          model: models.Post
        }],
        where: { userId: userId},
        order: [["createdAt", "ASC"]]
      }
    });
  };
  return Favorite;
};
