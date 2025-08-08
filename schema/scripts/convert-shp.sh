#!/usr/bin/env sh

## ./convert-shp.sh
##        mv *.sql to  schema/sql/target
##
## convert from shp file content to sql import script 
## shp2pgsql is part of postgres sql toolkit
 
##   AWSPATH="https://s3-us-west-2.amazonaws.com/files.scec.org/s3fs-public/projects/ctm/CTM2/Lee_2025"

PWD=`pwd`

echo "running "$0

echo "  --setup for lee2025"
shp2pgsql -I -s GCS_WGS_1984 ${PWD}"/../data/Lee_2025/shp/Lee_2025_extent.shp" lee2025_tb > lee2025_tb.sql
mv lee2025_tb.sql ../sql
echo "  --setup for shinevar2018"
shp2pgsql -I -s GCS_WGS_1984 ${PWD}"/../data/Shinevar_2018/shp/Shinevar_2018_extent.shp" shinevar2018_tb > shinevar2018_tb.sql
mv shinevar2018_tb.sql ../sql

#>>MeiPro:CFM5_preferred_traces mei$ ./convert-shp.sh
#>>Shapefile type: ArcZ
#>>Postgis type: MULTILINESTRING[4]

