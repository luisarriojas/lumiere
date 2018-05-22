<?php
/*
LumiereFotosDeBoda.com
Copyright (c) 2015 LumiereFotosDeBoda.com

Developed by Luis E. Arriojas for LumiereFotosDeBoda.com
LinkedIn: https://www.linkedin.com/in/luisarriojas
*/


$post = file_get_contents("php://input");
$post = json_decode($post, true);

header('Content-Type: application/json');

$photos = scandir("../../galleries/impresiones/" . $post['form']['folder'] . "/");
if (count($photos) <= 2){
    echo '{
        "result":"errorPhotos"
    }';
    exit;
}
unset($photos[0]);
unset($photos[1]);
natsort($photos);

//creates json
$json = "[";
foreach($photos as $key=>$value){
    $json .= '{"file":"' . $value . '", "status":false},';
}
$json = substr($json, 0, -1) . "]";

include('../../scripts/db.php');

/* replaces double quotes by single quotes */
$post['form']['id'] = str_replace('"', "'", $post['form']['id']);
$post['form']['password'] = str_replace('"', "'", $post['form']['password']);
$post['form']['title'] = str_replace('"', "'", $post['form']['title']);
$post['form']['folder'] = str_replace('"', "'", $post['form']['folder']);
$post['form']['status'] = str_replace('"', "'", $post['form']['status']);

/* sanitization */
$post['form']['id'] = $db->real_escape_string($post['form']['id']);
$post['form']['password'] = $db->real_escape_string($post['form']['password']);
$post['form']['title'] = $db->real_escape_string($post['form']['title']);
$post['form']['folder'] = $db->real_escape_string($post['form']['folder']);
$post['form']['status'] = $db->real_escape_string($post['form']['status']);

$data = $db->query("INSERT INTO printGalleries
                    (id, password, title, folder, status, files)
                    VALUES (".$post['form']['id'].", '".$post['form']['password']."', '".$post['form']['title']."', '".$post['form']['folder']."', '".$post['form']['status']."', '".$json."');");

if (!$db->errno) {
    echo '{
        "result":"success"
    }';
}else{
    echo '{
        "result":"serverError"
    }';
}
$db->close();
