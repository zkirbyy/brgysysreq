<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_POST['user_id'])) {
        die(json_encode(["success" => false, "message" => "No user_id received."]));
    }

    $user_id = $_POST['user_id'];
    $table_name = "userss"; // Change this if needed

    // Auto-detect the primary key column
    $query = "SHOW KEYS FROM $table_name WHERE Key_name = 'PRIMARY'";
    $result = $conn->query($query);

    if ($result && $row = $result->fetch_assoc()) {
        $primary_key = $row['Column_name']; // Get the detected primary key column
    } else {
        die(json_encode(["success" => false, "message" => "Failed to detect primary key column."]));
    }

    // Delete using the auto-detected primary key
    $sql = "DELETE FROM $table_name WHERE $primary_key = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        die(json_encode(["success" => false, "message" => "SQL Prepare Error: " . $conn->error]));
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
