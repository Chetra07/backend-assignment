<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Content-Type: application/json");

    include "../config/conection.php";

    $response = array(); // Initialize an empty array to store the response

    // Modify your SQL query to fetch products based on the specified style
    $sql = "SELECT product.pro_id, product.pro_name, product.pro_price, product.pro_cal, product.pro_des, product.pro_dis, product.pro_img, category.cat_name AS cat_name 
        FROM product 
        LEFT JOIN category ON product.cat_id = category.cat_id
        WHERE category.cat_name = 'main product1'
        ORDER BY product.pro_id ASC";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $response['product'] = array(); // Initialize an empty array for products

        while ($row = $result->fetch_assoc()) {
            $product = array(
                'pro_id' => $row['pro_id'],
                'pro_name' => $row['pro_name'],
                'pro_price' => $row['pro_price'],
                'pro_cal' => $row['pro_cal'],
                'pro_des' => $row['pro_des'],
                'pro_dis' => $row['pro_dis'],
                'pro_img' => $row['pro_img'],
                'cat_name' => $row['cat_name'] // Assuming 'cat_name' represents category name
            );

            $response['product'][] = $product; // Add product to the response array
        }
    } else {
        $response['message'] = 'No products found in the popular category';
    }

    echo json_encode($response); // Output the response as JSON
?>
