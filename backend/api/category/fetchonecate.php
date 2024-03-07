<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Content-Type: application/json');
include "../config/conection.php";
$response = array();

if (isset($_GET['cat_id'])) {
    // echo $_GET['cat_id'];
    $cat_id = $conn->real_escape_string($_GET['cat_id']); // Correct variable name to pro_id
    $sql = "SELECT * FROM category WHERE `cat_id` = $cat_id"; // Select image name from database
    $result = $conn->query($sql);
        $response['categories'] = array(); // Initialize an empty array for categories

        while ($row = $result->fetch_assoc()) {
            $category = array(
                'cat_id' => $row['cat_id'],
                'cat_name' => $row['cat_name']
            );

            $response['categories'][] = $category; // Add category to the response array
    }
    echo json_encode($response);
    exit();
} else {
    echo json_encode(array("message" => "Product ID not provided"));
    exit();
}
