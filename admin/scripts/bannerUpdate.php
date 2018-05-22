<?php
/*
LumiereFotosDeBoda.com
Copyright (c) 2015 LumiereFotosDeBoda.com

Developed by Luis E. Arriojas for LumiereFotosDeBoda.com
LinkedIn: https://www.linkedin.com/in/luisarriojas
*/


$post = file_get_contents("php://input");
$post = json_decode($post, true);

include('../../scripts/db.php');

/* replaces double quotes by single quotes */
$post['form']['id'] = str_replace('"', "'", $post['form']['id']);
$post['form']['title'] = str_replace('"', "'", $post['form']['title']);
$post['form']['subtitle'] = str_replace('"', "'", $post['form']['subtitle']);
$post['form']['status']['code'] = str_replace('"', "'", $post['form']['status']['code']);

/* sanitization */
$post['form']['id'] = $db->real_escape_string($post['form']['id']);
$post['form']['title'] = $db->real_escape_string($post['form']['title']);
$post['form']['subtitle'] = $db->real_escape_string($post['form']['subtitle']);
$post['form']['status']['code'] = $db->real_escape_string($post['form']['status']['code']);

$data = $db->query("UPDATE banner
                    SET title = '".$post['form']['title']."', subtitle = '".$post['form']['subtitle']."', status = ".$post['form']['status']['code']."
                    WHERE id = ".$post['form']['id']."
                    LIMIT 1;");

header('Content-Type: application/json');
if (!$db->errno) {
    if ($post['form']['imageTemp'] == true){
        rename('../../img/home/imageTemp.jpg', '../../img/home/'.$post['form']['id'].'.jpg');
    }

    if (file_exists('../../img/home/imageTemp.jpg')){
        unlink('../../img/home/imageTemp.jpg');
    }

    echo '{
        "result":"success"
    }';
}else{
    echo '{
        "result":"serverError"
    }';
}
$db->close();
