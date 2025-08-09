<?php
require_once("CTM.php");

$ctm = new CTM();

$type = $_REQUEST["t"];
$spec = json_decode($_REQUEST["s"]);
$criteria = json_decode($_REQUEST["q"]);

if (is_object($criteria[0])) { $criteria = (array)$criteria[0]; }
if (is_object($spec[0])) { $spec = (array)$spec[0]; }

//print_r($spec);exit;
//print_r($criteria);exit;
//print_r($type); exit;

if ($type === "model") {
  try {
    print $ctm->searchForModel($type, $spec)->outputJSON();
  } catch (BadFunctionCallException $e) {
    print "ctm search error";
  }
  } else {
    try {
      print $ctm->search($type, $spec, $criteria)->outputJSON();
    } catch (BadFunctionCallException $e) {
      print "ctm search error";
    }
}

