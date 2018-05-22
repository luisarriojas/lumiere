<?php
/*
LumiereFotosDeBoda.com
Copyright (c) 2015 LumiereFotosDeBoda.com

Developed by Luis E. Arriojas for LumiereFotosDeBoda.com
LinkedIn: https://www.linkedin.com/in/luisarriojas
*/
ob_start("ob_gzhandler");

header('Content-Type: application/json');

include('../../scripts/db.php');
$data = $db->query("SELECT *
					FROM about
					ORDER BY about.order ASC, about.title ASC;");

if (!$db->errno) {
	if ($data->num_rows) {
		$json = '{
					"result":"success",
					"cards":[';

		while ($row = $data->fetch_object()) {
			$json.='{
					"id" : "' . $row->id . '",
					"order" : "' . $row->order . '",
					"title" : "' . $row->title . '",
					"content" : "' . str_replace("\r", '', str_replace("\n", '<br>', $row->content)) . '"
					},';
		}

		$json = substr($json, 0, -1) . "]}";
		echo $json;
	}else{
		$json = '{
					"result":"success",
					"cards":[]
				}';
		echo $json;
	}
}else{
	echo '{
		"result":"error"
	}';
}
$db->close();
