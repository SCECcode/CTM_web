#!/bin/sh
##
## create-sql.sh
##
## create db specific sql files
##

rm -rf ../sql
mkdir ../sql

## add meta_table
cp sql_template/linkup_traces.sql ../sql

./convert-shp.sh
