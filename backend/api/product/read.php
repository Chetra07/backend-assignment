<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include "../config/conection.php";

$response = array(); // Initialize an empty array to store the response

// Set default values for page and limit
$page = isset($_GET['page']) ? $_GET['page'] : 1;
$limit = isset($_GET['limit']) ? $_GET['limit'] : 10;

// Calculate the offset based on the page number and limit
$offset = ($page - 1) * $limit;

// Query to fetch products with pagination
$sql = "SELECT * FROM product ORDER BY pro_id DESC LIMIT $limit OFFSET $offset";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $response['product'] = array(); // Initialize an empty array for products

    while ($row = $result->fetch_assoc()) {
        $product = array(
            'pro_id' => $row['pro_id'],
            'pro_name' => $row['pro_name'],
            'cat_id' => $row['cat_id'],
            'pro_price' => $row['pro_price'],
            'pro_cal' => $row['pro_cal'],
            'pro_des' => $row['pro_des'],
            'pro_dis' => $row['pro_dis'],
            'pro_img' => $row['pro_img'],
        );

        $response['product'][] = $product; // Add product to the response array
    }

    // Calculate total number of pages
    $totalProducts = $result->num_rows;
    $totalPages = ceil($totalProducts / $limit);

    $response['totalPages'] = $totalPages; // Add total pages to the response
} else {
    $response['message'] = 'No products found';
}

echo json_encode($response); // Output the response as JSON
?>
