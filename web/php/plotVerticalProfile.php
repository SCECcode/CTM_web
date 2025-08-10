<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
include ("util.php");

$lat = ($_GET['lat']);
$lon = ($_GET['lon']);
$zstart = ($_GET['zstart']);
$zend = ($_GET['zend']);
$zstep = ($_GET['zstep']);
$model = ($_GET['model']);
$comment = "'".($_GET['comment'])."'";
$uid = ($_GET['uid']);
$modelpath = ($_GET['modelpath']);

$file="../result/".$uid."_v.png";
$metafile="../result/".$uid."_v_meta.json";
$matpropsfile="../result/".$uid."_v_matprops.json";
$csvfile="../result/".$uid."_v_matprops.csv";
$pngfile="../result/".$uid."_v_matprops.png";
$pdffile="../result/".$uid."_v_matprops.pdf";

$gmtpl="../perl/plotCVM-1Dvert.pl";

//query_1d_depth_profile.py --lat 35 --lon -118 --z_start 0 --z_end 30000 --z_step 100 --mod
//elname Lee_2025 --modelpath ${MPATH}/ThermalModel_WUS_v2.nc --outpath ./test1d.csv

$estr = " --lat ".$lat." --lon ".$lon." --z_start ".$zstart." --z_end ".$zend." --z_step ".$zstep." --modelname '".$model."' --modelpath '".$modelpath."' --outpath ".$csvfile;
$query="query_1d_depth_profile.py ".$estr;

print($query);

$result = exec(escapeshellcmd($query), $retval, $status);
$rc=checkResult($query, $result, $uid);

$mode=4;

#Usage: ./plotCVM-1Dvert.pl path/to/file.csv plotParam plotMap plotFaults plotCities plotPts pad forceRange zMin zMax
$gmtcommand = $envstr." ".$gmtpl." ".$csvfile." ".$mode." 1 0 0 0 1 0";
$gmtresult = exec(escapeshellcmd($gmtcommand), $gmtretval, $gmtstatus);

print($gmtcommand);
print("<br>");
print("gmtresult:"); print($gmtresult); print("<br>");
print("gmtstatus:"); print($gmtstatus); print("<br>");
print("gmtretval:"); 
print("<pre>");
print_r($gmtretval);
print("</pre>");
print("<br>");

$resultarray = new \stdClass();
$resultarray->uid= $uid;
$resultarray->type= "vertical";
if (file_exists($file)) {
$resultarray->plot= $uid."_v.png";
}
$resultarray->query= $query;
$resultarray->meta= $uid."_v_meta.json";
$resultarray->dataset= $uid."_v_matprops.json";
$resultarray->csv= $uid."_v_matprops.csv";
$resultarray->gmtpng= $uid."_v_matprops.png";
$resultarray->gmtpdf= $uid."_v_matprops.pdf";
$jj=json_decode($gmtresult);
$jj->csv=$uid."_v_matprops.csv";
$jj->uid=$uid;
$gmtresult_n=json_encode($jj);
$resultarray->gmtresult= $gmtresult_n;

#print($pngfile);
#print("<br>");
#if (file_exists($pngfile)) {
#   print("png exist...");
#   } else {
#   print("png NOT exist...");
#}

if ( $gmtstatus == 0 && file_exists($pngfile)) {
$resultstring = htmlspecialchars(json_encode($resultarray), ENT_QUOTES, 'UTF-8');
echo "<div data-side=\"verticalProfile".$uid."\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
}
?>
</body>
</html>

