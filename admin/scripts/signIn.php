<?php
/*
LumiereFotosDeBoda.com
Copyright (c) 2015 LumiereFotosDeBoda.com

Developed by Luis E. Arriojas for LumiereFotosDeBoda.com
LinkedIn: https://www.linkedin.com/in/luisarriojas
*/
session_start();
$post = file_get_contents("php://input");
$post = json_decode($post, TRUE);

include('../../scripts/db.php');

/* replaces double quotes by single quotes */
$post['user'] = str_replace('"', "'", $post['user']);

/* sanitization */
$post['user'] = $db->real_escape_string($post['user']);

$data = $db->query("SELECT id, password
                    FROM admin
                    WHERE user = '" . $post['user'] . "'
                    LIMIT 1;");

header('Content-Type: application/json');
if (!$db->errno) {
    if ($data->num_rows) {
        $row = $data->fetch_object();
        if ($row->password == $post['password']){
            $_SESSION['isSignedInAdmin'] = true;
            echo '{
                "result":"success"
            }';
        }else{
            echo '{
                "result":"error"
            }';
        }
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
