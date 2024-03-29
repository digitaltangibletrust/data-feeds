INSERT INTO
  sericafeeds (
    name,
    token,
    bid_premium,
    ask_premium,
    subfeeds,
    subfeed_is_stale_minutes,
    active,created_at,
    updated_at
  )
  VALUES (
    'serica',
    'GOLDtoUSD',
    0.5,
    0.5,
    '[{"exchange":"goldfeed","weight":1}]',
    5,
    true,
    now(),
    now()
  );

INSERT INTO
  sericafeeds (
    name,
    token,
    bid_premium,
    ask_premium,
    subfeeds,
    subfeed_is_stale_minutes,
    active,
    created_at,
    updated_at
  )
  VALUES (
    'serica',
    'SILVERtoUSD',
    0.5,
    0.5,
    '[{"exchange":"goldfeed","weight":1}]',
    5,
    true,
    now(),
    now()
  );

INSERT INTO
  sericafeeds (
    name,
    token,
    bid_premium,
    ask_premium,
    subfeeds,
    subfeed_is_stale_minutes,
    active,
    created_at,
    updated_at
  )
  VALUES (
    'serica',
    'PLATINUMtoUSD',
    0.5,
    0.5,
    '[{"exchange":"goldfeed","weight":1}]',
    5,
    true,
    now(),
    now()
  );

INSERT INTO
  sericafeeds (
    name,
    token,
    bid_premium,
    ask_premium,
    subfeeds,
    subfeed_is_stale_minutes,
    active,
    created_at,
    updated_at
  )
  VALUES (
    'serica',
    'PALLADIUMtoUSD',
    0.5,
    0.5,
    '[{"exchange":"goldfeed","weight":1}]',
    5,
    true,
    now(),
    now()
  );

INSERT INTO
  sericafeeds (
    name,
    token,
    bid_premium,
    ask_premium,
    subfeeds,
    subfeed_is_stale_minutes,
    active,created_at,
    updated_at
  )
  VALUES (
    'serica',
    'GOLDtoEUR',
    0.5,
    0.5,
    '[{"exchange":"goldfeedEUR","weight":1}]',
    5,
    true,
    now(),
    now()
  );

INSERT INTO
  sericafeeds (
    name,
    token,
    bid_premium,
    ask_premium,
    subfeeds,
    subfeed_is_stale_minutes,
    active,
    created_at,
    updated_at
  )
  VALUES (
    'serica',
    'SILVERtoEUR',
    0.5,
    0.5,
    '[{"exchange":"goldfeedEUR","weight":1}]',
    5,
    true,
    now(),
    now()
  );

INSERT INTO
  sericafeeds (
    name,
    token,
    bid_premium,
    ask_premium,
    subfeeds,
    subfeed_is_stale_minutes,
    active,
    created_at,
    updated_at
  )
  VALUES (
    'serica',
    'PLATINUMtoEUR',
    0.5,
    0.5,
    '[{"exchange":"goldfeedEUR","weight":1}]',
    5,
    true,
    now(),
    now()
  );

INSERT INTO
  sericafeeds (
    name,
    token,
    bid_premium,
    ask_premium,
    subfeeds,
    subfeed_is_stale_minutes,
    active,
    created_at,
    updated_at
  )
  VALUES (
    'serica',
    'PALLADIUMtoEUR',
    0.5,
    0.5,
    '[{"exchange":"goldfeedEUR","weight":1}]',
    5,
    true,
    now(),
    now()
  );

INSERT INTO
  sericafeeds (
    name,
    token,
    bid_premium,
    ask_premium,
    subfeeds,
    subfeed_is_stale_minutes,
    active,
    created_at,
    updated_at
  )
  VALUES (
    'serica',
    'USDtoBTC',
    0.5,
    0.5,
    '[{"exchange":"bitstamp","weight":1},{"exchange":"bitfinex","weight":1},{"exchange":"btce","weight":1},{"exchange":"bitpay","weight":0}]',
    5,
    true,
    now(),
    now()
  );
