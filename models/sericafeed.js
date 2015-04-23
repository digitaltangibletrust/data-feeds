'use strict';
var _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  var globalModels;

  var sericafeed = sequelize.define("sericafeed", {
    "id": {
      "type": DataTypes.INTEGER,
      "primaryKey": true,
      "autoIncrement": true
    },
    // Can be reused to signify a containging feed for tokens bid/ask's
    "name": {
      "type": DataTypes.STRING,
      "allowNull": false,
      "defaultValue": "serica"
    },
    // Eg. "USDtoBTC" or "GOLDtoUSD"
    "token": {
      "type": DataTypes.STRING,
      "allowNull": false
    },
    // Percentage below market bid that we are willing to buy this asset
    "bid_premium": {
      "type": DataTypes.FLOAT,
      "allowNull": false,
      "defaultValue": 0.5
    },
    // Percentage above market ask that we are willing to sell this asset
    "ask_premium": {
      "type": DataTypes.FLOAT,
      "allowNull": false,
      "defaultValue": 0.5
    },
    // Weight to attribute each subfeed when composing our base bid/ask values. Stringified JSON object like so: {'bitfinex': 2, 'bitstamp': 3, 'btce': 1}
    "subfeed_weights": {
      "type": DataTypes.STRING,
      "allowNull": false,
      "defaultValue": JSON.stringify({})
    },
    // Number of minutes with no new data point for which we consider the feed non-functional and begin ignoring it
    "subfeed_is_stale_minutes": {
      "type": DataTypes.INTEGER,
      "allowNull": false,
      "defaultValue": 5
    },
    "active": {
      "type": DataTypes.BOOLEAN,
      "allowNull": false,
      "defaultValue": true
    }
  }, {
    "classMethods": {
      "associate": function (models) {
        globalModels = models;
      }
    },
    "instanceMethods": {
      "getExchanges": function () {
        return _.pluck(JSON.parse(this.subfeed_weights), 'exchange');
      },
      "getWeight": function (exchange) {
        var subfeed = _.find(JSON.parse(this.subfeed_weights), {'exchange': exchange});
        return subfeed.weight;
      }
    }
  });
  return sericafeed;
};
