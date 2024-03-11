<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include "../config/conection.php";

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and execute SQL query to count the number of categories
$sql = "SELECT COUNT(*) AS category_count FROM category";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $categoryCount = $row["category_count"];

    // Return the count as JSON
    echo json_encode(array("count" => $categoryCount));
} else {
    // If no categories found, return 0
    echo json_encode(array("count" => 0));
}

// Close database connection
$conn->close();
?>
