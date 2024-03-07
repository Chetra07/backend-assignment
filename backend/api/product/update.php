<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Content-Type: application/json');

include "../config/conection.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if pro_id and other required fields are set in the POST request
    if ( isset($_POST['pro_id']) && isset($_POST['pro_name']) && isset($_POST['pro_price']) && isset($_POST['pro_cal']) && isset($_POST['pro_des']) && isset($_POST['pro_dis'])) {
     
        $pro_id = $conn->real_escape_string($_POST['pro_id']); // Retrieve pro_id from POST parameters
        $pro_name = $conn->real_escape_string($_POST['pro_name']);
        $pro_price = $conn->real_escape_string($_POST['pro_price']);
        $pro_cal = $conn->real_escape_string($_POST['pro_cal']);
        $pro_des = $conn->real_escape_string($_POST['pro_des']);
        $pro_dis = $conn->real_escape_string($_POST['pro_dis']);

        // Prepare the SQL query to update the product
        $sql = "UPDATE `product` SET `pro_name` = '$pro_name', `pro_price` = '$pro_price', `pro_cal` = '$pro_cal', `pro_des` = '$pro_des', `pro_dis` = '$pro_dis' WHERE `pro_id` = $pro_id";

        // Execute the SQL query
        if ($conn->query($sql) === true) {
            // If the query executed successfully, return a success message
            $response = array("message" => "Product updated successfully");
            echo json_encode($response);
            exit(); // Terminate script execution after sending response
        } else {
            // If there was an error with the SQL query, return an error message
            $response = array("message" => "Failed to update product");
            echo json_encode($response);
            exit(); // Terminate script execution after sending response
        }
    } else {
        // If required fields are not set in the POST request, return an error message
        $response = array("message" => "Missing required parameters");
        echo json_encode($response);
        exit(); // Terminate script execution after sending response
    }
} else {
    // If the request method is not POST, return an error message
    $response = array("message" => "Invalid request method");
    echo json_encode($response);
    exit(); // Terminate script execution after sending response
}

?>
