<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Database Connection
$host = "localhost";
$user = "root"; // Default XAMPP user
$pass = ""; // Default XAMPP password is empty
$dbname = "barangay_db"; // Change this to your database name

$conn = new mysqli($host, $user, $pass, $dbname);

// Check Connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

// Fetch Only Approved/Rejected Requests
$sql = "SELECT id, name, request, date_requested, status FROM requests WHERE status IS NOT NULL ORDER BY date_requested DESC";
$result = $conn->query($sql);

$requests = [];
while ($row = $result->fetch_assoc()) {
    $requests[] = $row;
}

echo json_encode($requests);
?>
