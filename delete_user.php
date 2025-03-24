<?php
include 'db_connect.php';

header('Content-Type: application/json'); // Ensure correct response type

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_POST['user_id'])) {
        echo json_encode(["success" => false, "message" => "No user_id received."]);
        exit;
    }

    $user_id = $_POST['user_id'];
    $table_name = "userss"; // ✅ Make sure the table name is correct

    // Detect the primary key column dynamically
    $query = "SHOW KEYS FROM $table_name WHERE Key_name = 'PRIMARY'";
    $result = $conn->query($query);

    if ($result && $row = $result->fetch_assoc()) {
        $primary_key = $row['Column_name']; // Get the detected primary key column
    } else {
        echo json_encode(["success" => false, "message" => "Failed to detect primary key column."]);
        exit;
    }

    // Delete using the detected primary key
    $sql = "DELETE FROM $table_name WHERE $primary_key = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        echo json_encode(["success" => false, "message" => "SQL Prepare Error: " . $conn->error]);
        exit;
    }

    $stmt->bind_param("i", $user_id);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(["success" => true, "message" => "User deleted successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "User not found or not deleted."]);
    }

    $stmt->close();
    $conn->close();
}
?>
