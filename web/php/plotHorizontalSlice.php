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
$z = ($_GET['z']);
$model = ($_GET['model']);
$modelpath = ($_GET['modelpath']);
$uid = ($_GET['uid']);
$secondlat = ($_GET['secondlat']);
$secondlon = ($_GET['secondlon']);

$envstr=makeEnvString();

$lval= round(($secondlat - $firstlat), 3);
$llval=round(($secondlon - $firstlon), 3);

if ($lval == 0) {
echo "ERROR: Two points can not have same Latitute";
return;
}
if ($llval == 0) {
echo "ERROR: Two points can not have same Longitude";
return;
}

$file="../result/".$uid."_h.png";
$csvfile="../result/".$uid."_h_data.csv";
$pngfile="../result/".$uid."_h_data.png";
$pdffile="../result/".$uid."_h_data.pdf";

//query_2d_horizontal_slice.py --lat_start 34 --lon_start -119 --lat_end 35 
//--lon_end -116 --z 10200 --modelname Lee_2025 --modelpath 
//${MPATH}/ThermalModel_WUS_v2.nc --outpath ./test2d_horizontal.csv

$estr = " --lat_start ".$firstlat." --lon_start ".$firstlon." --lat_end ".$secondlat." --lon_end ".$secondlon." --z ".$z." --modelname ".$model." --modelpath ".$modelpath." --outpath ".$csvfile;
$query = $envstr." query_2d_horizontal_slice.py ".$estr;
print($query);

$result = exec(escapeshellcmd($query), $retval, $status);
$rc=checkResult($query,$result,$uid);
#print($result);

$gtype=1;
##old: csv, plotparam, plotfault, plotcities, potpts, cmap, range
##new: csv, plotparam, interp, plotpts, plotfault, plotcities, cmap, range
$gmtpl="../perl/plotCTM-horzSliceAll.pl";
$gmtcommand = $envstr." ".$gmtpl." ".$csvfile." ".$gtype." 0 0 0 0 1 0";
$gmtresult = exec(escapeshellcmd($gmtcommand), $gmtretval, $gmtstatus);

//print($gmtcommand);
//print("gmtresult:"); print($gmtresult); print("<br>");
//print("gmtstatus:"); print($gmtstatus); print("<br>");
//print("gmtretval:"); 
//print("<pre>");
//print_r($gmtretval);
//print("</pre>");
//print("<br>");


$end_time = microtime(true);
$elapsed_time = $end_time - $start_time;
#print("Elapsed time: ".round($elapsed_time, 2)." sec\n");

$resultarray = new \stdClass();
$resultarray->uid= $uid;
$resultarray->type="horizontal";
if (file_exists($file)) {
  $resultarray->plot= $uid."_h.png";
}
$resultarray->query= $query;
$resultarray->meta= $uid."_h_meta.json";
$resultarray->data= $uid."_h_data.bin";
$resultarray->csv= $uid."_h_data.csv";
$resultarray->gmtpng= $uid."_h_data.png";
$resultarray->gmtpdf= $uid."_h_data.pdf";
$resultarray->elapsed=round($elapsed_time, 2);
$jj=json_decode($gmtresult);
$jj->csv=$uid."_h_data.csv";
$jj->uid=$uid;
$gmtresult_n=json_encode($jj);
$resultarray->gmtresult= $gmtresult_n;

if ( $gmtstatus == 0 && file_exists($pngfile)) {
    $resultstring = htmlspecialchars(json_encode($resultarray), ENT_QUOTES, 'UTF-8');
    echo "<div data-side=\"horizontalSlice".$uid."\" data-params=\"";
    echo $resultstring;
    echo "\" style=\"display:flex\"></div>";
}  
?>
</body>
</html>

