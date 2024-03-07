<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow only POST method
header("Access-Control-Allow-Methods: POST");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Set the content type to JSON
header("Content-Type: application/json");

include "../config/conection.php";

if (isset($_POST['cat_name']) && !empty($_POST['cat_name'])) {
    $cat_name = $_POST['cat_name'];
    $cat_name = $conn->real_escape_string($cat_name);
    $sql = "INSERT INTO `category`(`cat_name`) VALUES ('$cat_name')";
    $rs = $conn->query($sql);
    if ($rs == true) {
        // Return success message as JSON
        echo json_encode(array("message" => "Created new category successfully"));
    } else {
        // Return error message as JSON
        echo json_encode(array("message" => "Failed to create new category"));
    }
} else {
    // Return error message as JSON if cat_name is not provided
    echo json_encode(array("message" => "Category name is required"));
}
?>
