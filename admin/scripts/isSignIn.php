<?php
session_start();

header('Content-Type: application/json');
if (!isset($_SESSION['isSignedInAdmin'])){
    echo '{
        "result":"error"
    }';
}else{
    echo '{
        "result":"success"
    }';
}
