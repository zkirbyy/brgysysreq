<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Include database connection
$host = "localhost";
$user = "root"; // Default XAMPP MySQL username
$pass = ""; // Default XAMPP MySQL password is empty
$dbname = "admin"; // Your database name

$conn = new mysqli($host, $user, $pass, $dbname);

// Check database connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

// Ensure it's a POST request
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["error" => "Invalid request method"]);
    exit;
}

// Get user input
$email = trim($_POST['email'] ?? '');
$password = trim($_POST['password'] ?? '');

// Validate input
if (empty($email) || empty($password)) {
    echo json_encode(["error" => "Email and password are required"]);
    exit;
}

// Query to check if the user exists in the login table
$stmt = $conn->prepare("SELECT email, password FROM login WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

// If no user found
if ($stmt->num_rows === 0) {
    echo json_encode(["error" => "Invalid credentials"]);
    exit;
}

// Bind result
$stmt->bind_result($db_email, $stored_password);
$stmt->fetch();

// Verify password (Assuming passwords are stored in plain text. If hashed, use password_verify)
if ($password === $stored_password) {
    echo json_encode(["success" => true, "message" => "Login successful", "email" => $db_email]);
} else {
    echo json_encode(["error" => "Invalid credentials"]);
}

// Close connections
$stmt->close();
$conn->close();
?>
