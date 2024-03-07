<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include "../config/conection.php";

$response = array(); // Initialize an empty array to store the response

$sql = "SELECT * FROM user"; // Assuming 'user' is the name of your user table
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $response['users'] = array(); // Initialize an empty array for users

    while ($row = $result->fetch_assoc()) {
        $user = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'username' => $row['username'],
            'password' => $row['password']
        );

        $response['users'][] = $user; // Add user to the response array
    }
} else {
    $response['message'] = 'No users found';
}

echo json_encode($response); // Output the response as JSON
?>
