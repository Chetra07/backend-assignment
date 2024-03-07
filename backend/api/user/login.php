<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
session_start();
// include "conection.php";
include "../config/conection.php";

    if(empty($_SESSION['username'])){
        // echo  $_SESSION['username'];

    }else{
        header("Location: home.php");
    }

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['username']) && !empty($_POST['username']) &&  isset($_POST['password']) && !empty($_POST['password'])) {

        $username = $_POST['username'];
        $password = $_POST['password'];
        
        // Sanitize user input
        $username = $conn->real_escape_string($username);
        $password = $conn->real_escape_string($password);


        $sql = "SELECT * FROM user WHERE username='$username' AND password='$password'";
        $rs = $conn->query($sql);
        if ($rs) {
            $row = $rs->fetch_assoc();
            $_SESSION['username'] = $row['username'];
            $_SESSION['id'] = $row['id'];
            header("Location: home.php");
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>

<body>

    <form action="" method="post">
        <label for="username">username</label>
        <input type="text" name="username" id="username">
        <label for="password">password</label>
        <input type="text" name="password" id="password">
        <input type="submit" value="login">

    </form>
    Click here to clean <a href="register.php" tite="Logout">Register.

</body>

</html>