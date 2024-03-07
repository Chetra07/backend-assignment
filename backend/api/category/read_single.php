<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include "../config/conection.php";

// Get the cat_id from the query parameters
$cat_id = $_GET['cat_id'];

// Prepare and execute SQL query to fetch the category with the given cat_id
$sql = "SELECT cat_name FROM category WHERE cat_id = $cat_id";
$result = $conn->query($sql);

// Check if the query was successful
if ($result === false) {
    // If the query failed, send an error message
    echo json_encode(array("error" => "Error executing query: " . $conn->error));
} else {
    // Check if any rows were returned
    if ($result->num_rows > 0) {
        // Fetch the category name and send it as JSON response
        $row = $result->fetch_assoc();
        $category = array("cat_name" => $row["cat_name"]);
        echo json_encode(array("category" => $category));
    } else {
        // If no category found, send an error message
        echo json_encode(array("error" => "Category not found"));
    }
}

// Close the database connection
$conn->close();
?>
