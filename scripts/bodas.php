<?php
/*
LumiereFotosDeBoda.com
Copyright (c) 2015 LumiereFotosDeBoda.com

Developed by Luis E. Arriojas for LumiereFotosDeBoda.com
LinkedIn: https://www.linkedin.com/in/luisarriojas
*/
ob_start("ob_gzhandler");

$photos = scandir("../galleries/" . $_GET['categoria'] . "/");
unset($photos[0]);
unset($photos[1]);
natsort($photos);

//creates json
$json = "[";
foreach($photos as $key=>$value){
    $json .= '{"file":"' . $value . '"},';
}
$json = substr($json, 0, -1) . "]";

if ($json == ']'){
    $json = '';
}

header('Content-Type: application/json');
echo $json;
