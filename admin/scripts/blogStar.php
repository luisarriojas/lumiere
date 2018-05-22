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
$post['id'] = str_replace('"', "'", $post['id']);

/* sanitization */
$post['id'] = $db->real_escape_string($post['id']);

$data = $db->query("UPDATE blog
					SET star = 0
					WHERE star = 1
					LIMIT 1;");

$data = $db->query("UPDATE blog
					SET star = 1
					WHERE id = " . $post['id'] . "
					LIMIT 1;");

header('Content-Type: application/json');
if (!$db->errno) {
	$json = '{
			"result":"success"
			}';
}
$db->close();