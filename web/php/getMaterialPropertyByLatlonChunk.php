<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include ("util.php");

/* get string and then need to split and extract triplet out of them */
$datastr = ($_GET['datastr']); 
$model = ($_GET['model']);
$chunkid = intVal($_GET['chunkid']);
$uid = ($_GET['uid']);
$lastchunks = intVal($_GET['chunks'])-1;

$modeldir = ($_GET['modeldir']);
$modeldata = ($_GET['modeldata']);
$ModelPathLoc = getenv('CTM_LARGEDATA_DIR');
if ( $ModelPathLoc == '' ) { ## if not define
  $ModelPathLoc = "../ctm_data";
}
$modelpath= $ModelPathLoc.'/model/'.$modeldir.'/'.$modeldata;
$envstr=makeEnvString();

/* if chunkid == 0, it is first chunk, create 
   the .csv file in result/CTM_uid_p_matprops.csv, 
   other ones, just 'append'               */

$fname="../result/".$uid."_p_matprops.csv";

// setup the start
if ($chunkid == 0) {
   $fp= fopen($fname,"w") or die("Unable to open file!");

   $line="# Title: CTM temperatures"."\n";
   fwrite($fp,$line); 
   $line="# CTM(abbr): ".$model."\n";
   fwrite($fp,$line); 
   $line="# Data_type: T[°C]0"."\n";
   fwrite($fp,$line); 
   fclose(fp); 
}

$datalist=explode(",",$datastr);

$tmpname="../result/".$uid."_latlon.txt";

if($chunkid == 0) {
  $tmpfp= fopen($tmpname,"w") or die("Unable to open file to write!");
  } else {
    $tmpfp= fopen($tmpname,"a+") or die("Unable to open file to append!");
}

$cnt=count($datalist);
$set= intval($cnt/3);

for($i=0; $i< $set; $i++) {
  $idx= $i*3;
  $lon=$datalist[$idx];
  $lat=$datalist[$idx+1];
  $z=$datalist[$idx+2];
  $line=$lon." ".$lat." ".$z."\n";
  fwrite($tmpfp,$line); 
}
fclose($tmpfp);

if($chunkid == $lastchunks) {
  $fp= fopen($fname,"a+") or die("Unable to open file!");

// ONLY make the call when the complete data file is saved from the chunks
  $estr = " --lat ".$lat." --lon ".$lon." --z ".$z." --modelname '".$model."' --modelpath ".$modelpath;
  $query = $envstr." query_0d_point.py ".$estr;
//  print($query);
//  {"lon":-117.5,"lat":34.31,"Z":0.0,"temp":19.637602355403533,"model":"boyd2019"}

  $result = exec(escapeshellcmd($query), $retval, $status);
  $item=json_decode($result);

  $line="# Total_pts: XXX"."\n";
  fwrite($fp,$line); 
  $line="# T Min: 0.000000"."\n";
  fwrite($fp,$line); 
  $line="# T Max: 666.224156"."\n";
  fwrite($fp,$line); 
  $line="# T Mean: 327.041934"."\n";
  fwrite($fp,$line); 
  $line="# Lon,Lat,Depth(m),Temperature(°C)"."\n";
  fwrite($fp,$line); 
  $line=$item->{"lon"}.",".$item->{"lat"}.",".$item->{"Z"}.",".$item->{"temp"}."\n";
  fwrite($fp,$line); 
  fclose($fp);
}

// don't transfer back the material property..
$resultarray = new \stdClass();
$resultarray->uid= $uid;
$resultarray->mp= $uid."_p_matprops.csv";
if($chunkid == $lastchunks) {
  $resultarray->query= $query;
  } else {
    $resultarray->query= "NA";
}

$resultstring = htmlspecialchars(json_encode($resultarray), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"materialPropertyByLatlonChunk".$uid."\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>

