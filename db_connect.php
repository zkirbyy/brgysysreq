<?php
$host = "localhost";
$user = "root"; // Default XAMPP MySQL username
$pass = ""; // Default XAMPP MySQL password (empty)
$dbname = "admin"; // Your database name

$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
