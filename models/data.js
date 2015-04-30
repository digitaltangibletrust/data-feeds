'use strict';
module.exports = function (sequelize, DataTypes) {
  var RESOLUTION_CONSTANTS = {
    "1m": "data_1min",
    "3m": "data_3min",
    "5m": "data_5min",
    "15m": "data_15min",
    "30m": "data_30min",
    "1h": "data_1h",
    "2h": "data_2h",
    "6h": "data_6h",
    "12h": "data_12h",
    "1d": "data_1d",
    "3d": "data_3d",
    "1w": "data_1w"
  };
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

      },
      "getResolution": function () {
        return RESOLUTION_CONSTANTS;
      },
      "getData": function (opts) {
        var query = [];
        var params = [];
        query.push("SELECT * FROM");
        query.push(opts.resolution);
        query.push("WHERE 1=1 ");
        if (opts.exchange) {
          query.push("AND exchange=?");
          params.push(opts.exchange);
        }
        if (opts.token) {
          query.push("AND token=?");
          params.push(opts.token);
        }
        if (opts.minutesAgo) {
          query.push("AND time >= NOW() - INTERVAL '" + opts.minutesAgo + " minutes'");
        }
        query.push("ORDER BY time " + ((opts.order && opts.order.toUpperCase() === "DESC") ? "DESC" : "ASC"));
        if (opts.limit) {
          query.push(" LIMIT ?");
          params.push(opts.limit);
        }
        return this.daoFactoryManager.sequelize.query(query.join(" "), null, {
          "raw": true
        }, params);
      },
      "getLatestPrices": function (token) {
        return this.daoFactoryManager.sequelize.query("SELECT DISTINCT ON(exchange) * from data_1min WHERE token = ? ORDER BY exchange, time DESC", null, {
          "raw": true
        }, [token]);
      }
    },
    "instanceMethods": {

    }
  });

  return data;
};
