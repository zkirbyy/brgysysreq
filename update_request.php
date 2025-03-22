<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

// Database Connection
$host = "localhost";
$user = "root"; // Default XAMPP user
$pass = ""; // Default XAMPP password is empty
$dbname = "barangay_db";

$conn = new mysqli($host, $user, $pass, $dbname);

// Check Connection
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit();
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate Data
if (!isset($data["id"]) || !isset($data["status"])) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit();
}

$id = $data["id"];
$status = $data["status"];

// Update the request status in the database
$sql = "UPDATE requests SET status = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $status, $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Request updated successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to update request"]);
}

$stmt->close();
$conn->close();
?>
