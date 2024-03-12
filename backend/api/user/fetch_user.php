<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include "../config/conection.php";

$response = array(); // Initialize an empty array to store the response

// Set default values for page and limit
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;

// Validate page and limit values
$page = max(1, $page); // Ensure page number is not less than 1
$limit = max(1, $limit); // Ensure limit is not less than 1

// Calculate the offset based on the page number and limit
$offset = ($page - 1) * $limit;

// Query to fetch users with pagination, sorted by ID in descending order
$sql = "SELECT * FROM user ORDER BY id DESC LIMIT $limit OFFSET $offset";
$result = $conn->query($sql);

if ($result) {
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

    // Query to get total number of users
    $totalCountQuery = "SELECT COUNT(*) as total FROM user";
    $totalCountResult = $conn->query($totalCountQuery);
    $totalCountRow = $totalCountResult->fetch_assoc();
    $totalUsers = isset($totalCountRow['total']) ? (int)$totalCountRow['total'] : 0;

    // Calculate total number of pages
    $totalPages = $totalUsers > 0 ? ceil($totalUsers / $limit) : 0;

    $response['totalPages'] = $totalPages; // Add total pages to the response
} else {
    $response['message'] = 'Failed to fetch users';
}

echo json_encode($response); // Output the response as JSON
?>
