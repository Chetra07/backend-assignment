<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Content-Type: application/json');

include "../config/conection.php";

if (isset($_GET['user_id'])) {
    $user_id = $conn->real_escape_string($_GET['user_id']);
    $sql = "DELETE FROM `user` WHERE id = $user_id";
    $rs = $conn->query($sql);
    if ($rs === true) {
        $response = array("message" => "User deleted successfully");
    } else {
        $response = array("message" => "Failed to delete user: " . mysqli_error($conn));
    }
    echo json_encode($response);
    exit();
}
?>
