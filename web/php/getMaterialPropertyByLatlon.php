<!DOCTYPE html>
<html>
<head>
</head>
<body>

<?php
$lat = ($_GET['lat']);
$lon = ($_GET['lon']);
$z = ($_GET['z']);
$model = ($_GET['model']);
$uid = ($_GET['uid']);
$modelpath = ($_GET['modelpath']);

$estr = " --lat ".$lat." --lon ".$lon." --z ".$z." --modelname '".$model."' --modelpath '".$modelpath."' --outpath ./foo";
$query="query_0d_point.py ".$estr;

$result = exec(escapeshellcmd($query), $retval, $status);
//print($query);

$result2="{\"longitude\":-118.0,\"latitude\":36.0,\"depth\":8000.0,\"temperature\":256.192703927}";

$item=json_decode($result2);
$item->{"model"} = $model;
$item->{"uid"} = $uid;
$nresult= json_encode($item);
print($nresult);

$itemlist = new \stdClass();

$itemlist->mp=$nresult;

$resultstring = htmlspecialchars(json_encode($itemlist), ENT_QUOTES, 'UTF-8');

echo "<div data-side=\"materialPropertyByLatlon".$uid."\" data-params=\""; 
echo $resultstring;
echo "\" style=\"display:flex\"></div>";
?>
</body>
</html>

