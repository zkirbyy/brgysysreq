<?php
// Connect to the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "admin";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Fetch the count of requests based on status
$sql = "SELECT 
            SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) AS pending,
            SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) AS approved,
            SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) AS rejected
        FROM requests";
        
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode([
        "pending" => (int)$row["pending"],
        "approved" => (int)$row["approved"],
        "rejected" => (int)$row["rejected"]
    ]);
} else {
    echo json_encode(["pending" => 0, "approved" => 0, "rejected" => 0]);
}

$conn->close();
?>
