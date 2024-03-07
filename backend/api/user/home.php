<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
    session_start();
    if(!empty($_SESSION['username'])){
        echo  $_SESSION['username'];

    }else{
        header("Location: login.php");
    }
   
    ?>
    home
    Click here to clean <a href = "logout.php" tite = "Logout">Logout.
</body>
</html>