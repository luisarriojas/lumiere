<?php
header('Content-Type: application/json');

list($width, $height, $type) = getimagesize($_FILES['image']['tmp_name']);
if ($type == 2) {           //jpeg
    $image_source = imagecreatefromjpeg($_FILES['image']['tmp_name']);
} else if ($type == 3) {    //png
    $image_source = imagecreatefrompng($_FILES['image']['tmp_name']);
} else if ($type == 1) {    //gif
    $image_source = imagecreatefromgif($_FILES['image']['tmp_name']);
} else {
    echo '{
        "uploaded":false,
        "message":"El archivo no es una imagen válida. Debe subir archivos con extension .jpg ó .png ó .gif."
    }';
    exit;
}

//se determina el porcentaje de reduccion
$percent = 1;
$width_canvas = 1600;
$height_canvas = 727;

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

imagejpeg($image_target, "../../img/home/imageTemp.jpg", 80);
imagedestroy($image_source);
imagedestroy($image_target);

echo '{"uploaded":true}';