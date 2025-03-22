<?php
$servername = "localhost";  // Keep this as "localhost" for XAMPP
$username = "root";         // Default XAMPP MySQL username
$password = "";             // Default is empty in XAMPP
$database = "user_management";        // Your database name

// Create a connection
$conn = new mysqli($servername, $username, $password, $database);

// Check if the connection failed
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
