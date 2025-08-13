<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php

include ("util.php");

$lat = ($_GET['lat']);
$lon = ($_GET['lon']);
$z = ($_GET['z']);
$model = ($_GET['model']);
$uid = ($_GET['uid']);
$modelpath = ($_GET['modelpath']);

$envstr=makeEnvString();

$estr = " --lat ".$lat." --lon ".$lon." --z ".$z." --modelname '".$model."' --modelpath ".$modelpath;
$query = $envstr." query_0d_point.py ".$estr;

$result = exec(escapeshellcmd($query), $retval, $status);
//print($query);
//print($status);
//print_r($result);

$item=json_decode($result);
$item->{"model"} = $model;
$item->{"uid"} = $uid;
$nresult= json_encode($item);
//print($nresult);

$itemlist = new \stdClass();

$itemlist->mp=$nresult;

$resultstring = htmlspecialchars(json_encode($itemlist), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"materialPropertyByLatlon".$uid."\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>

