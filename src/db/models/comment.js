'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Post, {
      foreignKey: "postId",
      onDelete: "CASCADE"
    });
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    Comment.addScope("lastFiveFor", (userId) => {
      return {
        include: [{
          model: models.Post
        }],
        where: { userId: userId},
        limit: 5,
        order: [["createdAt", "DESC"]]
      }
    });
  };




  return Comment;
};
