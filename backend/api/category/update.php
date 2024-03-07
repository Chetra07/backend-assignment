<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Content-Type: application/json');

include "../config/conection.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if cat_id and cat_name are set in the POST request
    if (isset($_POST['cat_id']) && isset($_POST['cat_name'])) {
        $cat_id = $conn->real_escape_string($_POST['cat_id']);
        $cat_name = $conn->real_escape_string($_POST['cat_name']);

        // Prepare the SQL query to update the category
        $sql = "UPDATE `category` SET `cat_name` = '$cat_name' WHERE `cat_id` = $cat_id";

        // Execute the SQL query
        if ($conn->query($sql) === true) {
            // If the query executed successfully, return a success message
            $response = array("message" => "Category updated successfully");
            echo json_encode($response);
            exit(); // Terminate script execution after sending response
        } else {
            // If there was an error with the SQL query, return an error message
            $response = array("message" => "Failed to update category");
            echo json_encode($response);
            exit(); // Terminate script execution after sending response
        }
    } else {
        // If cat_id or cat_name is not set in the POST request, return an error message
        $response = array("message" => "Missing cat_id or cat_name parameters");
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
