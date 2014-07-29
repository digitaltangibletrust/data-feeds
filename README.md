data-feeds
==========


##API
Optional params(for each route):
* interval: may be day, hour, month



```
GET /feed
```
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
GET /feed/:exchange
```
response(/feed/bitfinex):
```javascript
[{
  exchange: "bitfinex",
  token: "USDtoBTC",
  bid: 584.46,
  ask: 584.8,
  low: 577.11,
  high: 590,
  date_trunc: "2014-07-29T23:19:20.000Z"
}, {
  exchange: "bitfinex",
  token: "USDtoBTC",
  bid: 584.8,
  ask: 584.91,
  low: 577.11,
  high: 590,
  date_trunc: "2014-07-29T23:18:19.000Z"
}]
```
```
GET /feed/:exchange/:token
```
response(/feed/bitfinex/USDtoBTC)
```javascript

[{
  exchange: "bitfinex",
  token: "USDtoBTC",
  bid: 584.46,
  ask: 584.8,
  low: 577.11,
  high: 590,
  date_trunc: "2014-07-29T23:19:20.000Z"
}, {
  exchange: "bitfinex",
  token: "USDtoBTC",
  bid: 584.8,
  ask: 584.91,
  low: 577.11,
  high: 590,
  date_trunc: "2014-07-29T23:18:19.000Z"
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

