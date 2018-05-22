<?php

/*
LumiereFotosDeBoda.com
Copyright (c) 2015 LumiereFotosDeBoda.com

Developed by Luis E. Arriojas for LumiereFotosDeBoda.com
LinkedIn: https://www.linkedin.com/in/luisarriojas
*/

//IMPORTANT NOTE: Move this file outside public folder.

class Connection
{
    public $environment;    //development or production
    public $server;
    public $user;
    public $password;
    public $dbName;
}

$connection = new Connection;
$connection->environment = "production";

if ($connection->environment == "production") {
    $connection->server = "";
    $connection->user = "";
    $connection->password = "";
    $connection->dbName = "";
} else {
    $connection->server = "";
    $connection->user = "";
    $connection->password = "";
    $connection->dbName = "";
}

$db = new mysqli($connection->server, $connection->user, $connection->password, $connection->dbName);

if (!$db->connect_errno) {
    $db->set_charset("utf8");
} else {
    $db->close();
}