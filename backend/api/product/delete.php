<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Content-Type: application/json');

include "../config/conection.php";

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    if (isset($_GET['pro_id'])) {
        $pro_id = $conn->real_escape_string($_GET['pro_id']);

        $sql = "DELETE FROM `product` WHERE `pro_id` = $pro_id";

        if ($conn->query($sql) === true) {
            $response = array("message" => "Product deleted successfully");
            echo json_encode($response);
            exit();
        } else {
            $response = array("message" => "Failed to delete product");
            echo json_encode($response);
            exit();
        }
    } else {
        $response = array("message" => "Missing required parameters");
        echo json_encode($response);
        exit();
    }
} else {
    $response = array("message" => "Invalid request method");
    echo json_encode($response);
    exit();
}
?>
