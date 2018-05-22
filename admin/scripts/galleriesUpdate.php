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
$post['form']['password'] = str_replace('"', "'", $post['form']['password']);
$post['form']['title'] = str_replace('"', "'", $post['form']['title']);
$post['form']['folder'] = str_replace('"', "'", $post['form']['folder']);
$post['form']['status']['code'] = str_replace('"', "'", $post['form']['status']['code']);

/* sanitization */
$post['form']['id'] = $db->real_escape_string($post['form']['id']);
$post['form']['password'] = $db->real_escape_string($post['form']['password']);
$post['form']['title'] = $db->real_escape_string($post['form']['title']);
$post['form']['folder'] = $db->real_escape_string($post['form']['folder']);
$post['form']['status']['code'] = $db->real_escape_string($post['form']['status']['code']);

$data = $db->query("UPDATE printGalleries
                    SET password = '".$post['form']['password']."', title = '".$post['form']['title']."', folder = '".$post['form']['folder']."', status = ".$post['form']['status']['code']."
                    WHERE id = ".$post['form']['id']."
                    LIMIT 1;");

header('Content-Type: application/json');
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
