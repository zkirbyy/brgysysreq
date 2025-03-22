document.addEventListener("DOMContentLoaded", function () {
    console.log("Loading status data...");
    loadStatus();
});

function loadStatus() {
    fetch("http://localhost/brgysysreq/status.php")
        .then(response => response.json())
        .then(data => {
            console.log("Status Data:", data);
            let tableBody = document.getElementById("statusTableBody");
            tableBody.innerHTML = "";

            if (data.length === 0) {
                tableBody.innerHTML = "<tr><td colspan='4'>No approved/rejected requests.</td></tr>";
                return;
            }

            data.forEach(request => {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${request.name}</td>
                    <td>${request.request}</td>
                    <td>${request.date_requested}</td>
                    <td class="${request.status.toLowerCase()}">${request.status}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error fetching status:", error);
            document.getElementById("statusTableBody").innerHTML =
                "<tr><td colspan='4'>Failed to load data.</td></tr>";
        });
}
