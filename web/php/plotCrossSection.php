<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
$start_time = microtime(true);

include ("util.php");

$firstlat = ($_GET['firstlat']);
$firstlon = ($_GET['firstlon']);
$secondlat = ($_GET['secondlat']);
$secondlon = ($_GET['secondlon']);
$modelpath = ($_GET['modelpath']);

$model= ($_GET['model']);
$zstart = ($_GET['zstart']);
$zend = ($_GET['zend']);
$uid = ($_GET['uid']);
$hval = ($_GET['spacing']);

$envstr=makeEnvString();

$file="../result/".$uid."_c.png";
$csvfile="../result/".$uid."_c_data.csv";
$pngfile="../result/".$uid."_c_data.png";
$pdffile="../result/".$uid."_c_data.pdf";

//query_2d_cross_section.py --lat_start 34 --lon_start -119 --lat_end 35 --lon_end -116 
//--z_start 0 --z_end 25000 
//--modelname Lee_2025 --modelpath ${MPATH}/ThermalModel_WUS_v2.nc --outpath ./test2d_cross.csv

$estr = " --lat_start ".$firstlat." --lon_start ".$firstlon." --lat_end ".$secondlat." --lon_end ".$secondlon." --z_start ".$zstart." --z_end ".$zend." --modelname ".$model." --modelpath ".$modelpath." --outpath ".$csvfile;
$query = $envstr." query_2d_cross_section.py ".$estr;
print($query);

$result = exec(escapeshellcmd($query), $retval, $status);
//$rc=checkResult($query, $result, $uid);
//
print($result);

$vp_metafile="../result/".$uid."_vp_meta.json";
$vp_binfile="../result/".$uid."_vp_data.bin";
$vs_metafile="../result/".$uid."_vs_meta.json";
$vs_binfile="../result/".$uid."_vs_data.bin";
$density_metafile="../result/".$uid."_density_meta.json";
$density_binfile="../result/".$uid."_density_data.bin";
$cvsquery = $envstr." ucvm_cross_section2csv_all.py ".$vp_binfile." ".$vp_metafile." ".$vs_binfile." ".$vs_metafile." ".$density_binfile." ".$density_metafile." ".$csvfile;
$cvsresult = exec(escapeshellcmd($cvsquery), $cvsretval, $cvsstatus);

#Usage: ./plotCVM-vertSectionAll.pl path/to/file.csv 
#              interp plotPts plotMap plotFaults plotCities pad cMap forceRange zMin zMax

$gtype=1;

$gmtpl="../perl/plotCVM-vertSectionAll.pl";
$gmtcommand = $envstr." ".$gmtpl." ".$csvfile." ".$gtype. " 0 0 1 0 0 1 1 0"; 

$gmtresult = exec(escapeshellcmd($gmtcommand), $gmtretval, $gmtstatus);

print($gmtcommand);
print("<pre>");
print_r($gmtretval);
print("</pre>");

$end_time = microtime(true);
$elapsed_time = $end_time - $start_time;
#print("Elapsed time: ".round($elapsed_time, 2)." sec\n");

$resultarray = new \stdClass();
$resultarray->type= "cross";
$resultarray->uid= $uid;
if (file_exists($file)) {
$resultarray->plot= $uid."_c.png";
}
$resultarray->query= $query;
$resultarray->meta= $uid."_c_meta.json";
$resultarray->data= $uid."_c_data.bin";
$resultarray->csv= $uid."_c_data.csv";
$resultarray->gmtpng= $uid."_c_data.png";
$resultarray->gmtpdf= $uid."_c_data.pdf";
$resultarray->elapsed=round($elapsed_time, 2);
$jj=json_decode($gmtresult);
$jj->csv=$uid."_c_data.csv";
$jj->uid=$uid;
$gmtresult_n=json_encode($jj);
$resultarray->gmtresult= $gmtresult_n;

if ( $gmtstatus == 0 ) {
    $resultstring = htmlspecialchars(json_encode($resultarray), ENT_QUOTES, 'UTF-8');
    echo "<div data-side=\"crossSection".$uid."\" data-params=\"";
    echo $resultstring;
    echo "\" style=\"display:flex\"></div>";
}
?>
</body>
</html>

