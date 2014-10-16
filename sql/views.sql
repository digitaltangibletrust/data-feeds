--raw data
DROP VIEW IF EXISTS  data_1min; CREATE VIEW data_1min AS
SELECT source as exchange, token, bid, ask, low, high, date_trunc('second', created_at) as time
 FROM data d WHERE created_at > (date_trunc('day', NOW()) - '12 hours'::interval);


--AGG by 3 minutes
DROP VIEW IF EXISTS  data_3min; CREATE VIEW data_3min AS
SELECT source as exchange, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t as time
 FROM data d INNER JOIN generate_series(
  date_trunc('day', NOW()) - '1 day'::interval,
  date_trunc('day', NOW()),
  '3 minutes'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '2 minutes 59 seconds'::interval) GROUP BY source, token, t;
--AGG by 5 minutes
DROP VIEW IF EXISTS  data_5min; CREATE VIEW data_5min AS
SELECT source as exchange, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t as time
 FROM data d INNER JOIN generate_series(
  date_trunc('day', NOW()) - '48 hours'::interval,
  date_trunc('day', NOW()),
  '5 minutes'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '4 minutes 59 seconds'::interval) GROUP BY source, token, t;

--AGG by 15 minutes

DROP VIEW IF EXISTS  data_15min; CREATE VIEW data_15min AS
SELECT source as exchange, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t as time
 FROM data d INNER JOIN generate_series(
  date_trunc('day', NOW()) - '5 days'::interval,
  date_trunc('day', NOW()),
  '15 minutes'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '14 minutes 59 seconds'::interval) GROUP BY source, token, t;

--AGG by 30 minutes
DROP VIEW IF EXISTS  data_30min; CREATE VIEW data_30min AS
SELECT source as exchange, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t as time
 FROM data d INNER JOIN generate_series(
  date_trunc('day', NOW()) - '11 days'::interval,
  date_trunc('day', NOW()),
  '30 minutes'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '29 minutes 59 seconds'::interval) GROUP BY source, token, t;

--AGG by 1 hour
DROP VIEW IF EXISTS  data_1h; CREATE VIEW data_1h AS
SELECT source as exchange, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t as time
 FROM data d INNER JOIN generate_series(
  date_trunc('day', NOW()) - '15 days'::interval,
  date_trunc('day', NOW()),
  '1 hour'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '59 minutes 59 seconds'::interval) GROUP BY source, token, t;

 --AGG by 2 hours
 DROP VIEW IF EXISTS  data_2h; CREATE VIEW data_2h AS
SELECT source as exchange, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t as time
 FROM data d INNER JOIN generate_series(
  date_trunc('day', NOW()) - '35 days'::interval,
  date_trunc('day', NOW()),
  '2 hours'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '1 hour 59 minutes 59 seconds'::interval) GROUP BY source, token, t;
--AGG by 4 hours
DROP VIEW IF EXISTS  data_4h; CREATE VIEW data_4h AS
SELECT source as exchange, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t as time
 FROM data d INNER JOIN generate_series(
  NOW () - '60 days'::interval,
  date_trunc('day', NOW()),
  '4 hours'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '3 hour 59 minutes 59 seconds'::interval) GROUP BY source, token, t;

 --AGG by 6 hours
 DROP VIEW IF EXISTS  data_6h; CREATE VIEW data_6h AS
SELECT source as exchange, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t as time
 FROM data d INNER JOIN generate_series(
  date_trunc('day', NOW()) - '90 days'::interval,
  date_trunc('day', NOW()),
  '6 hours'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '5 hour 59 minutes 59 seconds'::interval) GROUP BY source, token, t;


 --AGG by 12 hours
 DROP VIEW IF EXISTS  data_12h; CREATE VIEW data_12h AS
SELECT source as exchange, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t as time
 FROM data d INNER JOIN generate_series(
  date_trunc('day', NOW()) - '180 days'::interval,
  date_trunc('day', NOW()),
  '12 hours'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '11 hour 59 minutes 59 seconds'::interval) GROUP BY source, token, t;

 --AGG by 1 day
 DROP VIEW IF EXISTS data_1d; CREATE VIEW data_1d AS
SELECT source as exchange, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t as time
 FROM data d INNER JOIN generate_series(
  date_trunc('day', NOW()) - '210 days'::interval,
  date_trunc('day', NOW()),
  '1 day'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '1 day 23 hours 59 minutes 59 seconds'::interval) GROUP BY source, token, t;


 --AGG by 3 days

 DROP VIEW IF EXISTS  data_3d; CREATE VIEW data_3d AS
SELECT source as exchange, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t as time
 FROM data d INNER JOIN generate_series(
  date_trunc('day', NOW()) - '1 year'::interval,
  date_trunc('day', NOW()),
  '3 days'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '2 days 23 hour 59 minutes 59 seconds'::interval) GROUP BY source, token, t;


 --AGG by 1 week
 DROP VIEW IF EXISTS  data_1w; CREATE VIEW data_1w AS
SELECT source as exchange, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t as time
 FROM data d INNER JOIN generate_series(
  date_trunc('day', NOW()) - '1 year'::interval,
  date_trunc('day', NOW()),
  '1 week'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '6 days 23 hour 59 minutes 59 seconds'::interval) GROUP BY source, token, t;
