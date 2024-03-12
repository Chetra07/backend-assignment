<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Include the database connection file
include "../config/conection.php";

// Initialize the response array
$response = array();

// Check if the database connection is established
if ($conn) {
    // Define the SQL query
    $sql = "SELECT product.pro_id, product.pro_name, product.pro_price, product.pro_cal, product.pro_des, product.pro_dis, product.pro_img, category.cat_name AS cat_name 
        FROM product 
        LEFT JOIN category ON product.cat_id = category.cat_id
        WHERE category.cat_name = 'discount slider'
        ORDER BY product.pro_id ASC";

    // Execute the SQL query
    $result = $conn->query($sql);

    // Check if the query was successful
    if ($result) {
        // Check if there are any rows returned
        if ($result->num_rows > 0) {
            $response['product'] = array(); // Initialize an empty array for products

            // Fetch the data and add it to the response array
            while ($row = $result->fetch_assoc()) {
                $product = array(
                    'pro_id' => $row['pro_id'],
                    'pro_name' => $row['pro_name'],
                    'pro_price' => $row['pro_price'],
                    'pro_cal' => $row['pro_cal'],
                    'pro_des' => $row['pro_des'],
                    'pro_dis' => $row['pro_dis'],
                    'pro_img' => $row['pro_img'],
                    'cat_name' => $row['cat_name']
                );

                $response['product'][] = $product;
            }
        } else {
            $response['message'] = 'No products found in the popular category';
        }
    } else {
        // Handle query execution error
        $response['error'] = 'Error executing the SQL query: ' . $conn->error;
    }
} else {
    // Handle database connection error
    $response['error'] = 'Database connection failed: ' . mysqli_connect_error();
}

// Output the response as JSON
echo json_encode($response);
?>
