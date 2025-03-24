<?php
include __DIR__ . '/db_connect.php'; // Ensure correct file path

// Fetch new users count (using `date_signed_up`)
$user_query = "SELECT COUNT(*) AS new_users FROM userss WHERE date_signed_up >= NOW() - INTERVAL 1 DAY";
$user_result = $conn->query($user_query);

if (!$user_result) {
    die("User Query Error: " . $conn->error);
}

$user_row = $user_result->fetch_assoc();

// Fetch pending requests count
$request_query = "SELECT COUNT(*) AS pending_requests FROM requests WHERE status = 'pending'";
$request_result = $conn->query($request_query);

if (!$request_result) {
    die("Requests Query Error: " . $conn->error);
}

$request_row = $request_result->fetch_assoc();

echo json_encode([
    "new_users" => $user_row["new_users"],
    "pending_requests" => $request_row["pending_requests"]
]);
?>
