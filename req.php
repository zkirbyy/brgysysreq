<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");

// Database Connection
$host = "localhost";
$user = "root"; // Default XAMPP user
$pass = ""; // Default XAMPP password is empty
$dbname = "barangay_db"; // Update this with your actual database name

$conn = new mysqli($host, $user, $pass, $dbname);

// Check Connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

// Fetch Requests with Status
$sql = "SELECT id, name, request, date_requested, status FROM requests ORDER BY date_requested DESC";
$result = $conn->query($sql);

// Check if any records exist
if ($result->num_rows > 0) {
    $requests = [];
    while ($row = $result->fetch_assoc()) {
        $requests[] = $row;
    }
    echo json_encode($requests);
} else {
    echo json_encode([]); // Return an empty array if no requests are found
}

// Close Connection
$conn->close();
?>
