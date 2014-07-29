'use strict';
module.exports = function (sequelize, DataTypes) {
  var data = sequelize.define("data", {
    "source": {
      "type": DataTypes.STRING,
      "allowNull": false
    },
    "token": {
      "type": DataTypes.STRING,
      "allowNull": false
    },
    "bid": {
      "type": DataTypes.FLOAT,
      "allowNull": false
    },
    "ask": {
      "type": DataTypes.FLOAT,
      "allowNull": false
    },
    "low": {
      "type": DataTypes.FLOAT,
      "allowNull": false
    },
    "high": {
      "type": DataTypes.FLOAT,
      "allowNull": false
    }
  }, {
    "tableName": "data",
    "classMethods": {
      "associate": function (models) {

      }
    },
    "instanceMethods": {

    }
  });

  return data;
};
