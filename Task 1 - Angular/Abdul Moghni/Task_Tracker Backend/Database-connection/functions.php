<?php

function response($message="", $status=false, $data=null){
    echo json_encode(["status" => $status, "message" => $message, "data" => $data]);
    exit();
}

?>