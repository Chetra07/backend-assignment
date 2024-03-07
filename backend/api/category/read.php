<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json");

    include "../config/conection.php";

    $response = array(); // Initialize an empty array to store the response

    $sql = "SELECT * FROM category";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $response['categories'] = array(); // Initialize an empty array for categories

        while ($row = $result->fetch_assoc()) {
            $category = array(
                'cat_id' => $row['cat_id'],
                'cat_name' => $row['cat_name']
            );

            $response['categories'][] = $category; // Add category to the response array
        }
    } else {
        $response['message'] = 'No categories found';
    }

    echo json_encode($response); // Output the response as JSON
?>
