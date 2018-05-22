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

include('db.php');

/* replaces double quotes by single quotes */
$post['id'] = str_replace('"', "'", $post['id']);

/* sanitization */
$post['id'] = $db->real_escape_string($post['id']);

$data = $db->query("SELECT password , title, folder
                    FROM printGalleries
                    WHERE id = " . $post['id'] . "
                        AND STATUS =  '1'
                    LIMIT 1;");

header('Content-Type: application/json');
if (!$db->errno) {
    if ($data->num_rows) {
        $row = $data->fetch_object();
        if ($row->password == $post['password']) {
            $_SESSION['isSignedIn'] = true;
            echo '{
                "result":"success"
            }';
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
} else {
    echo '{
        "result":"error"
    }';
}
$db->close();
