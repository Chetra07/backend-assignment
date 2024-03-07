<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
include "../config/conection.php";
session_start();

if (!empty($_SESSION['username'])) {
    $response = array(
        'success' => false,
        'message' => 'User is already logged in'
    );
    echo json_encode($response);
    exit; // Stop further execution
}

if (
    isset($_POST['name']) && !empty($_POST['name']) &&
    isset($_POST['username']) && !empty($_POST['username']) &&
    isset($_POST['password']) && !empty($_POST['password'])
) {
    $name = $conn->real_escape_string($_POST['name']);
    $username = $conn->real_escape_string($_POST['username']);
    $password = $conn->real_escape_string($_POST['password']);

    $sql = "INSERT INTO `user`(`name`, `username`, `password`) VALUES ('$name', '$username', '$password')";
    $result = $conn->query($sql);

    if ($result) {
        $response = array(
            'success' => true,
            'message' => 'New user added successfully'
        );
    } else {
        $response = array(
            'success' => false,
            'message' => 'Failed to create new user: ' . $conn->error
        );
    }
} else {
    $response = array(
        'success' => false,
        'message' => 'Invalid or missing parameters'
    );
}

echo json_encode($response);
?>
