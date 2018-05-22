<?php
/*
LumiereFotosDeBoda.com
Copyright (c) 2015 LumiereFotosDeBoda.com

Developed by Luis E. Arriojas for LumiereFotosDeBoda.com
LinkedIn: https://www.linkedin.com/in/luisarriojas
*/
ob_start("ob_gzhandler");

include('db.php');
$data = $db->query("SELECT title, content
					FROM about
					ORDER BY about.order ASC, about.title ASC;");

header('Content-Type: application/json');
if (!$db->errno) {
    if ($data->num_rows) {
        $json = '{
					"result":"success",
					"cards":[';

        while ($row = $data->fetch_object()) {
            $json .= '{
					"title" : "' . $row->title . '",
					"content" : "' . str_replace("\r", '', str_replace("\n", '<br>', $row->content)) . '"
					},';
        }

        $json = substr($json, 0, -1) . "]}";
        echo $json;
    } else {
        echo '{
			"result":"error"
		}';
    }
} else {
    echo '{
		"result":"error"
	}';
}
$db->close();
