<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include "../config/conection.php";

// Check if all required fields are provided and not empty
if (
    isset($_POST['pro_name'], $_POST['cat_id'], $_POST['pro_price'], $_POST['pro_cal'], $_POST['pro_des'], $_POST['pro_dis'], $_FILES['pro_img']['name']) &&
    !empty($_POST['pro_name']) && !empty($_POST['cat_id']) && !empty($_POST['pro_price']) && !empty($_POST['pro_cal']) && !empty($_POST['pro_des']) && !empty($_POST['pro_dis']) && !empty($_FILES['pro_img']['name'])
) {
    // Escape and sanitize user inputs
    $pro_name = $conn->real_escape_string($_POST['pro_name']);
    $cat_id = $conn->real_escape_string($_POST['cat_id']);
    $pro_price = $conn->real_escape_string($_POST['pro_price']);
    $pro_cal = $conn->real_escape_string($_POST['pro_cal']);
    $pro_des = $conn->real_escape_string($_POST['pro_des']);
    $pro_dis = $conn->real_escape_string($_POST['pro_dis']);

    // Handle file upload
    $targetDirectory = "../image/";

    // Generate a unique file name for the image
    $randomName = uniqid() . '_' . time();
    $imageFileType = strtolower(pathinfo($_FILES['pro_img']['name'], PATHINFO_EXTENSION));
    $targetFile = $targetDirectory . $randomName . '.' . $imageFileType;

    // Check if the uploaded file is an image
    $check = getimagesize($_FILES['pro_img']['tmp_name']);
    if ($check === false) {
        echo json_encode(['message' => 'Uploaded file is not an image.']);
        exit();
    }

    // Check file size (limit to 500KB)
    if ($_FILES['pro_img']['size'] > 600000) {
        echo json_encode(['message' => 'File is too large.']);
        exit();
    }

    // Allow only specific file formats
    $allowedExtensions = array("jpg", "jpeg", "png", "gif");
    if (!in_array($imageFileType, $allowedExtensions)) {
        echo json_encode(['message' => 'Only JPG, JPEG, PNG & GIF files are allowed.']);
        exit();
    }

    // Attempt to move the uploaded file to the target directory
    if (move_uploaded_file($_FILES['pro_img']['tmp_name'], $targetFile)) {
        $pro_img = basename($targetFile);

        // Insert product into the database
        $sql = "INSERT INTO `product`(`pro_name`, `cat_id`, `pro_price`, `pro_cal`, `pro_des`, `pro_dis`, `pro_img`) 
                VALUES ('$pro_name', '$cat_id', '$pro_price', '$pro_cal', '$pro_des', '$pro_dis', '$pro_img')";

        if ($conn->query($sql) === true) {
            echo json_encode(['message' => 'New product added successfully']);
        } else {
            echo json_encode(['message' => 'Failed to add new product: ' . $conn->error]);
        }
    } else {
        echo json_encode(['message' => 'Error uploading file.']);
    }
} else {
    echo json_encode(['message' => 'Incomplete data provided']);
}
?>
