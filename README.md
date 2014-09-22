data-feeds
==========

#Installation
requirements: node.js, postgresql
* run `SYNC_DB=true node feeds.js` for recreating db structure(warning: all data will be lost)
* run `CREATE_VIEWS=true node feeds.js` for creating aggregating views for data

##API


```
GET /feed/<exchange>/<token>?
```
/feed/goldfeed/GOLDtoBTC?interval=day
availableIntervals = ["day", "hour", "month"];

response:
```javascript

[{
  exchange: "lakebtc",
  token: "CNYtoBTC",
  bid: 3601.9,
  ask: 3615.26,
  low: 3576.11,
  high: 3649.09,
  date_trunc: "2014-07-29T23:19:39.000Z"
}, {
  exchange: "lakebtc",
  token: "USDtoBTC",
  bid: 583.77,
  ask: 585.95,
  low: 579.6,
  high: 591.43,
  date_trunc: "2014-07-29T23:19:39.000Z"
}]

```

```
GET /latest?token=:token
```
Gets latest prices on token


```
GET /tokens
```
response:
```javascript
[{
  token: "GOLDtoUSD"
}, {
  token: "CNYtoBTC"
}, {
  token: "SILVERtoUSD"
}, {
  token: "PALLADIUMtoUSD"
}, {
  token: "USDtoBTC"
}, {
  token: "PLATINUMtoUSD"
}]
```
```
GET /exchanges
```
response:
```javascript
[{
  exchange: "btce"
}, {
  exchange: "goldfeed"
}, {
  exchange: "lakebtc"
}, {
  exchange: "bitfinex"
}, {
  exchange: "bitstamp"
}]
```

