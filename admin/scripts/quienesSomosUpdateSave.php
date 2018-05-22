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
$post['card']['id'] = str_replace('"', "'", $post['card']['id']);
$post['card']['order'] = str_replace('"', "'", $post['card']['order']);
$post['card']['title'] = str_replace('"', "'", $post['card']['title']);
$post['card']['content'] = str_replace('"', "'", $post['card']['content']);

/* sanitization */
$post['card']['id'] = $db->real_escape_string($post['card']['id']);
$post['card']['order'] = $db->real_escape_string($post['card']['order']);
$post['card']['title'] = $db->real_escape_string($post['card']['title']);
$post['card']['content'] = $db->real_escape_string($post['card']['content']);

$data = $db->query("UPDATE about
                    SET about.order = ".$post['card']['order'].", title = '".$post['card']['title']."', content = '".$post['card']['content']."'
                    WHERE id = ".$post['card']['id']."
                    LIMIT 1;");

header('Content-Type: application/json');
if (!$db->errno) {
    echo '{
        "result":"success"
    }';
}else{
    echo '{
        "result":"error"
    }';
}
$db->close();