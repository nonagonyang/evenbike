\echo 'Delete and recreate evenbike db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE evenbike;
CREATE DATABASE evenbike;
\connect evenbike

\i Documents/SB_2022/evenbike/evenbike_schema.sql
\i Documents/SB_2022/evenbike/evenbike_seed.sql

\echo 'Delete and recreate evenbike_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE evenbike_test;
CREATE DATABASE evenbike_test;
\connect evenbike_test

\i Documents/SB_2022/evenbike/evenbike_schema.sql
