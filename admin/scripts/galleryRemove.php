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

$data = $db->query("DELETE FROM printGalleries
                    WHERE id = " . $_GET['id'] . "
                    LIMIT 1;");

if (!$db->errno) {
    echo    '{
                "result":"success"
            }';
}else{
    echo    '{
                "result":"error"
            }';
}
$db->close();
