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
$_GET['id'] = str_replace('"', "'", $_GET['id']);

/* sanitization */
$_GET['id'] = $db->real_escape_string($_GET['id']);

$data = $db->query("SELECT *
					FROM about
					WHERE id = " . $_GET['id'] . "
					LIMIT 1;");

header('Content-Type: application/json');
if (!$db->errno) {
	if ($data->num_rows) {
		$json = '{
					"result":"success",
					"card":';

		$json .= json_encode($data->fetch_object()) . "}";
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