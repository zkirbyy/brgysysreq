<?php
include 'db_connect.php'; // Ensure this file exists and is correctly included

header('Content-Type: application/json'); // Set JSON response

$sql = "SELECT COUNT(*) AS approved_count FROM requests WHERE status = 'approved'";
$result = $conn->query($sql);

if ($result) {
    $row = $result->fetch_assoc();
    echo json_encode(['approved_count' => (int)$row['approved_count']]);
} else {
    echo json_encode(['approved_count' => 0]);
}

$conn->close();
?>
