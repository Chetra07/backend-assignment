<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Content-Type: application/json');

include "../config/conection.php";

if (isset($_GET['cat_id'])) {
    $cat_id = $conn->real_escape_string($_GET['cat_id']);
    $sql = "DELETE FROM `category` WHERE cat_id = $cat_id";
    $rs = $conn->query($sql);
    if ($rs === true) {
        $response = array("message" => "Category deleted successfully");
    } else {
        $response = array("message" => "Failed to delete category: " . mysqli_error($conn));
    }
    echo json_encode($response);
    exit();
}
?>
