<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

session_start();

include "../config/conection.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['password']) && !empty($_POST['password'])) {

        $username = $_POST['username'];
        $password = $_POST['password'];
        
        // Sanitize user input
        $username = $conn->real_escape_string($username);
        $password = $conn->real_escape_string($password);

        $sql = "SELECT * FROM user WHERE username='$username' AND password='$password'";
        $rs = $conn->query($sql);
        if ($rs && $rs->num_rows > 0) {
            $row = $rs->fetch_assoc();
            $_SESSION['username'] = $row['username'];
            $_SESSION['id'] = $row['id'];
            echo json_encode(array("success" => true, "message" => "Login successful"));
            exit;
        } else {
            echo json_encode(array("success" => false, "message" => "Invalid username or password"));
            exit;
        }
    } 
    else {
        echo json_encode(array("success" => false, "message" => "Missing username or password"));
        exit;
    }
}
?>
