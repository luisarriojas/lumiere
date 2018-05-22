<?php
/*
LumiereFotosDeBoda.com
Copyright (c) 2015 LumiereFotosDeBoda.com

Developed by Luis E. Arriojas for LumiereFotosDeBoda.com
LinkedIn: https://www.linkedin.com/in/luisarriojas
*/

$post = file_get_contents("php://input");
$post = json_decode($post, true);
$files = json_encode($post['files']);

include('db.php');

/* replaces double quotes by single quotes */
$post['id'] = str_replace('"', "'", $post['id']);
/*$files = str_replace('"', "'", $files);*/ //no se debe hacer esto ya que $files contiene un JSON, y esto dañaria los double quotes que rodean el nombre de los atributos.

/* sanitization */
$post['id'] = $db->real_escape_string($post['id']);
$files = $db->real_escape_string($files);

$data = $db->query("UPDATE printGalleries
                    SET files = '" . $files . "'
                    WHERE id = " . $post['id'] . "
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
