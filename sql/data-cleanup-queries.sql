-------------------------
-- DELETE GOLDFEED SPIKES 
-- this one matches against a known errant ask value
-------------------------

SELECT *
FROM DATA AS parent
WHERE source = 'goldfeed'
  AND token IN ('SILVERtoUSD',
                'GOLDtoUSD',
                'PALLADIUMtoUSD',
                'PLATINUMtoUSD',
                'SILVERtoBTC',
                'GOLDtoBTC',
                'PALLADIUMtoBTC',
                'PLATINUMtoBTC')
  AND created_at > (NOW() - INTERVAL '4 HOURS')
  AND EXISTS
    (SELECT created_at
     FROM DATA
     WHERE source='goldfeed'
       AND token='SILVERtoUSD'
       AND ask='16.25'
       AND (created_at > (parent.created_at - INTERVAL '20 SECONDS')
            AND created_at < (parent.created_at + INTERVAL '20 SECONDS')));


SELECT *
FROM DATA AS parent
WHERE source='goldfeedEUR'
  AND token IN ('SILVERtoEUR',
                'GOLDtoEUR',
                'PALLADIUMtoEUR',
                'PLATINUMtoEUR')
    AND created_at > (NOW() - INTERVAL '4 HOURS')
  AND EXISTS
    (SELECT created_at
     FROM DATA
     WHERE source='goldfeedEUR'
       AND token='SILVERtoEUR'
       AND ask='13.01'
       AND (created_at > (parent.created_at - INTERVAL '20 SECONDS')
            AND created_at < (parent.created_at + INTERVAL '20 SECONDS')));

-----------------
-- FIND SPIKES --
-- this one looks for dramatic increases relative to previous datapoints
-----------------

SELECT *
FROM DATA AS parent
WHERE token = 'SILVERtoBTC'
  AND created_at > (NOW() - INTERVAL '1 DAY')
  AND EXISTS
    (SELECT created_at
     FROM DATA
     WHERE SOURCE='goldfeed'
       AND token='SILVERtoBTC'
       AND parent.ask > ask*1.015
       AND (created_at > (parent.created_at - INTERVAL '130 SECONDS')
            AND created_at < parent.created_at)
    );