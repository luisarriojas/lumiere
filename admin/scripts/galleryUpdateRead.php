<?php
/*
LumiereFotosDeBoda.com
Copyright (c) 2015 LumiereFotosDeBoda.com

Developed by Luis E. Arriojas for LumiereFotosDeBoda.com
LinkedIn: https://www.linkedin.com/in/luisarriojas
*/

header('Content-Type: application/json');

include('../../scripts/db.php');

/* replaces double quotes by single quotes */
$_GET['id'] = str_replace('"', "'", $_GET['id']);

/* sanitization */
$_GET['id'] = $db->real_escape_string($_GET['id']);


$data = $db->query("SELECT password, title, folder, status
                    FROM printGalleries
                    WHERE id = " . $_GET['id'] . "
                    LIMIT 1;");

if (!$db->errno) {
    if ($data->num_rows) {
        $row = $data->fetch_object();
        echo    '{
                    "result":"success",
                    "id":'.$_GET['id'].',
                    "password":"'.$row->password.'",
                    "title":"'.$row->title.'",
                    "folder":"'. $row->folder . '",
                    "status":{
                        "code": '.$row->status.',
                        "text": ""
                    }
                }';
    } else {
        echo '{
            "result":"error"
        }';
    }
}else{
    echo '{
        "result":"error"
    }';
}
$db->close();
