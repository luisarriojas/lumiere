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
$data = $db->query("SELECT id, title, star
					FROM blog
					ORDER BY id DESC;");

if (!$db->errno) {
	if ($data->num_rows) {
		$json = '{
			"result":"success",
			"articles":[';

		while ($row = $data->fetch_object()) {
			$json.=json_encode($row).",";
		}

		$json = substr($json, 0, -1) . "]}";
		echo $json;
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