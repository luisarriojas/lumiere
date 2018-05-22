<?php
/*
LumiereFotosDeBoda.com
Copyright (c) 2015 LumiereFotosDeBoda.com

Developed by Luis E. Arriojas for LumiereFotosDeBoda.com
LinkedIn: https://www.linkedin.com/in/luisarriojas
*/

include('../../scripts/db.php');
$data = $db->query("SELECT id, title, subtitle, status
    FROM banner
    ORDER BY id ASC;");

header('Content-Type: application/json');
if (!$db->errno) {
    if ($data->num_rows) {
        $json = '{
            "result":"success",
            "slides":[';
        while ($row = $data->fetch_object()) {
            $json .= '{
                "id":'.$row->id.',
                "title":"'.$row->title.'",
                "subtitle":"'.$row->subtitle.'",
                "status":"'.($row->status==1 ? "ON" : "OFF").'",
                "image":"'.$row->id.'.jpg?token='.rand().'"
            },';
        }
        $json = substr($json, 0, -1) . "]}";
        echo $json;
    }else{
        echo '{
            "result":"serverError"
        }';
    }
}else{
    echo '{
        "result":"serverError"
    }';
}
$db->close();