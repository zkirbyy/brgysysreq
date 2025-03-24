<?php
include 'db_connect.php'; // Ensure you have the correct database connection file

$sql = "SELECT COUNT(*) AS pending_count FROM requests WHERE status = 'pending'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode(['pending_count' => $row['pending_count']]);
} else {
    echo json_encode(['pending_count' => 0]);
}

$conn->close();
?>
