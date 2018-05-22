<?php
/*
LumiereFotosDeBoda.com
Copyright (c) 2015 LumiereFotosDeBoda.com

Developed by Luis E. Arriojas for LumiereFotosDeBoda.com
LinkedIn: https://www.linkedin.com/in/luisarriojas
*/
ob_start("ob_gzhandler");

include('db.php');

/* replaces double quotes by single quotes */
$_GET['id'] = str_replace('"', "'", $_GET['id']);

/* sanitization */
$_GET['id'] = $db->real_escape_string($_GET['id']);

$data = $db->query("SELECT id, title, body, publishedOn
					FROM blog
					WHERE id = " . $_GET['id'] . "
					LIMIT 1;");

header('Content-Type: application/json');
if (!$db->errno) {
	if ($data->num_rows) {
		$json = '{
					"result":"success",
					"article":';

		$row = $data->fetch_object();
		$json.='{
					"id" : "' . $row->id . '",
					"title" : "' . $row->title . '",
					"body" : "' . str_replace("\r", '', str_replace("\n", '<br>', $row->body)) . '",
					"publishedOn" : "' . $row->publishedOn . '"
				}
			}';
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
