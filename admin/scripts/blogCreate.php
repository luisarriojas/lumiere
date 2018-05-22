<?php
/*
LumiereFotosDeBoda.com
Copyright (c) 2015 LumiereFotosDeBoda.com

Developed by Luis E. Arriojas for LumiereFotosDeBoda.com
LinkedIn: https://www.linkedin.com/in/luisarriojas
*/

include('../../scripts/db.php');

/* replaces double quotes by single quotes */
$_POST['title'] = str_replace('"', "'", $_POST['title']);
$_POST['body'] = str_replace('"', "'", $_POST['body']);

/* sanitization */
$_POST['title'] = $db->real_escape_string($_POST['title']);
$_POST['body'] = $db->real_escape_string($_POST['body']);

$data = $db->query("INSERT INTO blog
                    (id, title, body, publishedOn, star)
                    VALUES (NULL, '".$_POST['title']."', '".$_POST['body']."', NOW(), '0');");

header('Content-Type: application/json');
if (!$db->errno) {
    $data = $db->query("SELECT LAST_INSERT_ID() AS id;");
    $row = $data->fetch_object();

    list($width, $height, $type) = getimagesize($_FILES['picture']['tmp_name']);

    if ($type == 2) {           //jpeg
        $image_source = imagecreatefromjpeg($_FILES['picture']['tmp_name']);
    } else if ($type == 3) {    //png
        $image_source = imagecreatefrompng($_FILES['picture']['tmp_name']);
    } else if ($type == 1) {    //gif
        $image_source = imagecreatefromgif($_FILES['picture']['tmp_name']);
    } else {
        echo '{
            "result":"serverError",
            "message":"El archivo no es una imagen válida. Debe subir archivos con extension .jpg ó .png ó .gif."
        }';
        exit;
    }

    //se determina el porcentaje de reduccion
    $percent = 1;
    $width_canvas = 300;
    $height_canvas = 136;

    if (($width_canvas / $width) >= ($height_canvas / $height)) {
        $percent = $width_canvas / $width;
    } else {
        $percent = $height_canvas / $height;
    }

    $new_width = $width * $percent;
    $new_height = $height * $percent;

    $image_target = imagecreatetruecolor($width_canvas, $height_canvas); //se crea el canvas destino y se le coloca color blanco de fondo
    imagefill($image_target, 0, 0, imagecolorallocate($image_target, 0xff, 0xff, 0xff));

    imagecopyresampled($image_target, $image_source, ($width_canvas - $new_width) / 2, ($height_canvas - $new_height) / 2, 0, 0, $new_width, $new_height, $width, $height);

    imagejpeg($image_target, "../../img/blog/" . $row->id . ".jpg", 80);
    imagedestroy($image_source);
    imagedestroy($image_target);
    
    echo '{
        "result":"success"
    }';
}else{
    echo '{
        "result":"serverError"
    }';
}
$db->close();