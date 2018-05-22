<?php
session_start();

// Unset all of the session variables. session_unset is deprecated.
$_SESSION = array();

// Finally, destroy the session.
session_destroy();

header('Content-Type: application/json');
echo '{
    "result":"success"
}';
