'use strict';
module.exports = (sequelize, DataTypes) => {
  var banner = sequelize.define('banner', {
    source: DataTypes.STRING,
    description: DataTypes.STRING,
    topicId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE",
      references: {
        model: "Topics",
        key: "id",
        as: "topicId",
      }
    }
  }, {});
  banner.associate = function(models) {
    // associations can be defined here
    banner.belongsTo(models.Topic, {
       foreignKey: "topicId",
       onDelete: "CASCADE",
     });
  };
  return banner;
};
