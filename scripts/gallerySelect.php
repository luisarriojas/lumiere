<?php
/*
LumiereFotosDeBoda.com
Copyright (c) 2015 LumiereFotosDeBoda.com

Developed by Luis E. Arriojas for LumiereFotosDeBoda.com
LinkedIn: https://www.linkedin.com/in/luisarriojas
*/
ob_start("ob_gzhandler");
session_start();

header('Content-Type: application/json');
if (!isset($_SESSION['isSignedIn'])){
    echo '{
        "result":"error"
    }';
    exit;
}

include('db.php');

/* replaces double quotes by single quotes */
$_GET['id'] = str_replace('"', "'", $_GET['id']);

/* sanitization */
$_GET['id'] = $db->real_escape_string($_GET['id']);

$data = $db->query("SELECT title, folder, files
                    FROM printGalleries
                    WHERE id = " . $_GET['id'] . "
                        AND status =  '1'
                    LIMIT 1;");

if (!$db->errno) {
    if ($data->num_rows) {
        $row = $data->fetch_object();
        echo    '{
                    "result":"success",
                    "title":"' . $row->title . '",
                    "folder":"'. $row->folder . '",
                    "photos":'. $row->files . '
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
