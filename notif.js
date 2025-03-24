document.addEventListener("DOMContentLoaded", function () {
    console.log("notif.js is loaded!"); // Debugging
    fetchNotifications();
});

function fetchNotifications() {
    console.log("Fetching notifications...");
    fetch("fetch_notifications.php")
        .then(response => response.json())
        .then(data => {
            console.log("Notifications received:", data);
            displayNotifications(data);
        })
        .catch(error => console.error("Error fetching notifications:", error));
}

function displayNotifications(data) {
    let newUsers = document.getElementById("new-users");
    let pendingRequests = document.getElementById("pending-requests");

    if (!newUsers || !pendingRequests) {
        console.error("Notification elements not found!");
        return;
    }

    newUsers.innerText = data.new_users > 0 ? `🆕 ${data.new_users} NEW USER(S) SIGNED UP!!! !` : "";
    pendingRequests.innerText = data.pending_requests > 0 ? `📄 ${data.pending_requests} PENDING REQUEST(S)!` : "";
}

// Refresh notifications every 10 seconds
setInterval(fetchNotifications, 10000);

document.addEventListener("DOMContentLoaded", function () {
    fetchPendingRequests();
    setInterval(fetchPendingRequests, 5000); // Update every 5 seconds
});

function fetchPendingRequests() {
    fetch('get_pending_requests.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('pendingRequests').textContent = data.pending;
        })
        .catch(error => console.error('Error fetching pending requests:', error));
}

document.addEventListener("DOMContentLoaded", function () {
    function fetchPendingRequests() {
        fetch("fetch_pending_request.php") // Ensure this path is correct
            .then(response => response.json())
            .then(data => {
                document.getElementById("pendingRequests").innerText = data.pending_count;
            })
            .catch(error => console.error("Error fetching pending requests:", error));
    }

    // Call function on page load
    fetchPendingRequests();

    // Refresh count every 5 seconds (optional)
    setInterval(fetchPendingRequests, 5000);
});

function fetchApprovedRequests() {
    fetch("http://localhost/brgysysreq/fetch_approved_request.php")
    .then(response => response.json())
    .then(data => {
        console.log("Approved Requests Count:", data.approved_count);
        const approvedRequestsElement = document.getElementById("approvedRequests");
        if (approvedRequestsElement) {
            approvedRequestsElement.textContent = data.approved_count;
        } else {
            console.error("Approved Requests element not found!");
        }
    })
    .catch(error => console.error("Error fetching approved requests:", error));
}

// Call the function and refresh every 5 seconds
fetchApprovedRequests();
setInterval(fetchApprovedRequests, 5000);
