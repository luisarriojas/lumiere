<?php
/*
LumiereFotosDeBoda.com
Copyright (c) 2015 LumiereFotosDeBoda.com

Developed by Luis E. Arriojas for LumiereFotosDeBoda.com
LinkedIn: https://www.linkedin.com/in/luisarriojas
*/

$post = file_get_contents("php://input");
$post = json_decode($post, TRUE);

$emailText = 'Nombre: ' . $post['name'] . '
    Email: ' . $post['email'] . '
    Telefono: ' . $post['phone'] . '
    Lugar del evento: ' . $post['place'] . '
    Fecha del evento: ' . $post['date'] . '
    Asunto: ' . $post['subject'] . '
    Mensaje: ' . $post['message'];

mail("lumierefotosdeboda@gmail.com", $post['subject'], $emailText, "From: " . $post['name'] . " <" . $post['email'] . ">");

header('Content-Type: application/json');
echo '{
    "result":"success"
}';
