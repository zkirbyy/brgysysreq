document.addEventListener("DOMContentLoaded", function () {
    console.log("Loading requests...");
    loadRequests();
});

function loadRequests() {
    fetch("http://localhost/brgysysreq/req.php")
        .then(response => response.json())
        .then(data => {
            console.log("API Data:", data);
            let tableBody = document.querySelector("tbody");
            tableBody.innerHTML = "";

            if (data.length === 0) {
                tableBody.innerHTML = "<tr><td colspan='4'>No pending requests.</td></tr>";
                return;
            }

            data.forEach(request => {
                let row = document.createElement("tr");
                row.setAttribute("data-id", request.id);

                let actionButtons = request.status === "Pending" ? `
                    <button class="approve-btn" onclick="updateRequest(${request.id}, 'Approved', this)">Approve</button>
                    <button class="reject-btn" onclick="updateRequest(${request.id}, 'Rejected', this)">Reject</button>
                ` : `<span class="done">Done</span>`;

                row.innerHTML = `
                    <td>${request.name}</td>
                    <td>${request.request}</td>
                    <td>${request.date_requested}</td>
                    <td>${actionButtons}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error fetching requests:", error);
            document.querySelector("tbody").innerHTML = "<tr><td colspan='4'>Failed to load data.</td></tr>";
        });
}

function updateRequest(id, status, button) {
    fetch("http://localhost/brgysysreq/update_request.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, status: status })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.success) {
            alert(`Request has been ${status}`);

            // Change button text to "Done"
            let row = button.closest("tr");
            if (row) {
                row.innerHTML = `
                    <td>${row.children[0].textContent}</td>
                    <td>${row.children[1].textContent}</td>
                    <td>${row.children[2].textContent}</td>
                    <td><span class="done">Done</span></td>
                `;
            }
        } else {
            alert("Error updating request");
        }
    })
    .catch(error => console.error("Error:", error));
}
