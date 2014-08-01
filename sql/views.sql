--AGG by 3 minutes
CREATE OR REPLACE VIEW data_3min AS
SELECT source, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t
 FROM data d INNER JOIN generate_series(
  (SELECT min(created_at)::date FROM data) - '1 day'::interval,
  (SELECT max(created_at)::date FROM data) + '1 day':: interval,
  '3 minutes'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '2 minutes 59 seconds'::interval) GROUP BY source, token, t;
--AGG by 5 minutes
CREATE OR REPLACE VIEW data_5min AS
SELECT source, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t
 FROM data d INNER JOIN generate_series(
  (SELECT min(created_at)::date FROM data) - '1 day'::interval,
  (SELECT max(created_at)::date FROM data) + '1 day':: interval,
  '5 minutes'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '4 minutes 59 seconds'::interval) GROUP BY source, token, t;

--AGG by 15 minutes

CREATE OR REPLACE VIEW data_15min AS
SELECT source, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t
 FROM data d INNER JOIN generate_series(
  (SELECT min(created_at)::date FROM data) - '1 day'::interval,
  (SELECT max(created_at)::date FROM data) + '1 day':: interval,
  '15 minutes'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '14 minutes 59 seconds'::interval) GROUP BY source, token, t;

--AGG by 30 minutes
CREATE OR REPLACE VIEW data_30min AS
SELECT source, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t
 FROM data d INNER JOIN generate_series(
  (SELECT min(created_at)::date FROM data) - '1 day'::interval,
  (SELECT max(created_at)::date FROM data) + '1 day':: interval,
  '30 minutes'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '29 minutes 59 seconds'::interval) GROUP BY source, token, t;

--AGG by 1 hour
CREATE OR REPLACE VIEW data_1h AS
SELECT source, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t
 FROM data d INNER JOIN generate_series(
  (SELECT min(created_at)::date FROM data) - '1 day'::interval,
  (SELECT max(created_at)::date FROM data) + '1 day':: interval,
  '1 hour'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '59 minutes 59 seconds'::interval) GROUP BY source, token, t;

 --AGG by 2 hours
 CREATE OR REPLACE VIEW data_2h AS
SELECT source, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t
 FROM data d INNER JOIN generate_series(
  (SELECT min(created_at)::date FROM data) - '1 day'::interval,
  (SELECT max(created_at)::date FROM data) + '1 day':: interval,
  '2 hours'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '1 hour 59 minutes 59 seconds'::interval) GROUP BY source, token, t;
--AGG by 4 hours
CREATE OR REPLACE VIEW data_4h AS
SELECT source, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t
 FROM data d INNER JOIN generate_series(
  (SELECT min(created_at)::date FROM data) - '1 day'::interval,
  (SELECT max(created_at)::date FROM data) + '1 day':: interval,
  '4 hours'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '3 hour 59 minutes 59 seconds'::interval) GROUP BY source, token, t;

 --AGG by 6 hours
 CREATE OR REPLACE VIEW data_6h AS
SELECT source, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t
 FROM data d INNER JOIN generate_series(
  (SELECT min(created_at)::date FROM data) - '1 day'::interval,
  (SELECT max(created_at)::date FROM data) + '1 day':: interval,
  '6 hours'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '5 hour 59 minutes 59 seconds'::interval) GROUP BY source, token, t;


 --AGG by 12 hours
 CREATE OR REPLACE VIEW data_12h AS
SELECT source, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t
 FROM data d INNER JOIN generate_series(
  (SELECT min(created_at)::date FROM data) - '1 day'::interval,
  (SELECT max(created_at)::date FROM data) + '1 day':: interval,
  '12 hours'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '11 hour 59 minutes 59 seconds'::interval) GROUP BY source, token, t;

 --AGG by 1 day
 CREATE OR REPLACE VIEW data_1d AS
SELECT source, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t
 FROM data d INNER JOIN generate_series(
  (SELECT min(created_at)::date FROM data) - '1 day'::interval,
  (SELECT max(created_at)::date FROM data) + '1 day':: interval,
  '1 day'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '1 day 23 hours 59 minutes 59 seconds'::interval) GROUP BY source, token, t;


 --AGG by 3 days

 CREATE OR REPLACE VIEW data_3d AS
SELECT source, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t
 FROM data d INNER JOIN generate_series(
  (SELECT min(created_at)::date FROM data) - '1 day'::interval,
  (SELECT max(created_at)::date FROM data) + '1 day':: interval,
  '3 days'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '2 days 23 hour 59 minutes 59 seconds'::interval) GROUP BY source, token, t;


 --AGG by 1 week
 CREATE OR REPLACE VIEW data_1w AS
SELECT source, token, AVG(bid) as bid, AVG(ask) as ask, AVG(low) as low, AVG(high) as high, t
 FROM data d INNER JOIN generate_series(
  (SELECT min(created_at)::date FROM data) - '1 day'::interval,
  (SELECT max(created_at)::date FROM data) + '1 day':: interval,
  '1 week'::interval
  ) as t  ON (d.created_at BETWEEN t AND t + '6 days 23 hour 59 minutes 59 seconds'::interval) GROUP BY source, token, t;
