<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Content-Type: application/json');

include "../config/conection.php";

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if user_id, name, username, and password are set in the POST request
    if (
        isset($_POST['id']) && isset($_POST['name']) &&
        isset($_POST['username']) && isset($_POST['password'])
    ) {
        // Sanitize and escape POST data to prevent SQL injection
        $id = $conn->real_escape_string($_POST['id']);
        $name = $conn->real_escape_string($_POST['name']);
        $username = $conn->real_escape_string($_POST['username']);
        $password = $conn->real_escape_string($_POST['password']);

        // Prepare the SQL query to update the user
        $sql = "UPDATE `user` SET `name` = '$name', `username` = '$username', `password` = '$password' WHERE `id` = $id";

        // Execute the SQL query
        if ($conn->query($sql) === true) {
            // If the query executed successfully, return a success message
            $response = array("message" => "User updated successfully");
            echo json_encode($response); // Output JSON response
            exit(); // Terminate script execution after sending response
        } else {
            // If there was an error with the SQL query, return an error message
            $response = array("message" => "Failed to update user: " . $conn->error);
            echo json_encode($response); // Output JSON response
            exit(); // Terminate script execution after sending response
        }
    } else {
        // If any of the required parameters are missing in the POST request, return an error message
        $response = array("message" => "Missing user_id, name, username, or password parameters");
        echo json_encode($response); // Output JSON response
        exit(); // Terminate script execution after sending response
    }
} else {
    // If the request method is not POST, return an error message
    $response = array("message" => "Invalid request method");
    echo json_encode($response); // Output JSON response
    exit(); // Terminate script execution after sending response
}
?>
