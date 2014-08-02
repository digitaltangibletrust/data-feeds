data-feeds
==========

#Installation
requirements: node.js, postgresql
* run `SYNC_DB=true node feeds.js` for recreating db structure(warning: all data will be lost)
* run `CREATE_VIEWS=true node feeds.js` for creating aggregating views for data

##API


```
GET /feed
```
query params:
* ?exchange=:exchange_name
* ?token=:token
* ?res=:resolution may be: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 12h, 1d, 3d, 1w
* ?limit=:limit
* ?order=desc(affects only time)
and any combination of them
for example: if you want to get gold price for past 24h
`/feed?token=GOLDtoUSD&res=1d&limit=1&order=desc`

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

