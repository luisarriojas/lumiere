<?php
/*
LumiereFotosDeBoda.com
Copyright (c) 2015 LumiereFotosDeBoda.com

Developed by Luis E. Arriojas for LumiereFotosDeBoda.com
LinkedIn: https://www.linkedin.com/in/luisarriojas
*/

include('../../scripts/db.php');

$data = $db->query("SELECT id, title, folder, status
                    FROM printGalleries
                    ORDER BY id ASC;");

header('Content-Type: application/json');
if (!$db->errno) {
    if ($data->num_rows) {
        $json = '{
            "result":"success",
            "records":[';
        while ($row = $data->fetch_object()) {
            $json .= '{
                "id":'.$row->id.',
                "title":"'.$row->title.'",
                "folder":"'.$row->folder.'",
                "status":"'.($row->status==1 ? "ON" : "OFF").'"
            },';
        }
        $json = substr($json, 0, -1) . "]}";
        echo $json;
    }
}else{
    echo '{
        "result":"serverError"
    }';
}
$db->close();
