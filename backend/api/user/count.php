<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include "../config/conection.php";

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and execute SQL query to count the number of products
$sql = "SELECT COUNT(*) AS user_count FROM user";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $productCount = $row["user_count"];

    // Return the count as JSON
    echo json_encode(array("count" => $productCount));
} else {
    // If no products found, return 0
    echo json_encode(array("count" => 0));
}

// Close database connection
$conn->close();
?>
