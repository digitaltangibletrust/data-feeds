'use strict';
var _ = require('lodash');
var async = require('async');

module.exports = function (sequelize, DataTypes) {
  var globalModels;

  var sericafeed = sequelize.define("sericafeed", {
    "id": {
      "type": DataTypes.INTEGER,
      "primaryKey": true,
      "autoIncrement": true
    },
    // Can be reused to signify a containing feed for tokens bid/ask's
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
    // A subfeed is an exchange and a weight to attribute to it's values when composing our base bid/ask values. Stringified JSON object like so: [{"exchange":"bitstamp","weight":1},{"exchange":"bitfinex","weight":1},{"exchange":"btce","weight":1}]
    "subfeeds": {
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
        return _.pluck(JSON.parse(this.subfeeds), 'exchange');
      },
      "getWeight": function (exchange) {
        var subfeed = _.find(JSON.parse(this.subfeeds), {'exchange': exchange});
        return subfeed.weight;
      },
      "calcSpreads": function(cb) {
        var feed = this;
        var totalWeight = 0;

        var composite = {
          'source': feed.name,
          'token': feed.token,
          'bid': 0,
          'ask': 0,
          'low': 0,
          'high': 0
        };

        async.each(feed.getExchanges(), function(exchange, eachCB) {
          globalModels.data.getData({
            'resolution': 'data_1min',
            'exchange': exchange,
            'token': feed.token,
            'order': 'DESC',
            'minutesAgo': feed.subfeed_is_stale_minutes,
            'limit': 1,
          }).complete(function(err, data) {
            if (err) {
              return eachCB(err);
            }

            //If we don't see the feed it is likely stale
            if(data && data[0]) {
              composite.bid += data[0].bid;
              composite.ask += data[0].ask;
              composite.low += data[0].low;
              composite.high += data[0].high;
              totalWeight += feed.getWeight(exchange);
            }


            eachCB();
          });
        }, function(err) {
          if (err) {
            return cb(err);
          }

          // normalize
          composite.bid /= totalWeight;
          composite.ask /= totalWeight;
          composite.low /= totalWeight;
          composite.high /= totalWeight;

          // adjust by the serica bid and ask premium
          composite.bid *= (1 - feed.bid_premium / 100);
          composite.ask *= (1 + feed.ask_premium / 100);
          composite.low *= (1 - feed.bid_premium / 100);
          composite.high *= (1 + feed.ask_premium / 100);


          cb(null, composite);
        });
      }
    }
  });
  return sericafeed;
};
