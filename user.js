document.addEventListener("DOMContentLoaded", function () {
    fetchUsers();
});

function fetchUsers() {
    fetch("http://localhost/brgysysreq/get_user.php")
        .then(response => response.json())
        .then(data => {
            let users = data.users;
            let tableBody = document.querySelector("#user-table tbody");

            tableBody.innerHTML = ""; // Clear table before inserting new data

            if (users.length === 0) {
                document.getElementById("no-user-popup").style.display = "block";
            } else {
                users.forEach(user => {
                    let row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${user.fullname}</td>
                        <td>${user.email}</td>
                        <td>${user.address}</td>
                        <td>${user.contact_number}</td>
                        <td>${new Date(user.date_signed_up).toLocaleString()}</td>
                        <td><button class="delete-btn" data-id="${user.id}">Delete</button></td>
                    `;
                    tableBody.appendChild(row);
                });

                // Attach event listeners after table is updated
                document.querySelectorAll(".delete-btn").forEach(button => {
                    button.addEventListener("click", function () {
                        let userId = this.getAttribute("data-id");
                        deleteUser(userId);
                    });
                });
            }
        })
        .catch(error => console.error("Error fetching users:", error));
}

function deleteUser(userId) {
    if (confirm("Are you sure you want to delete this user?")) {
        fetch("http://localhost/brgysysreq/delete_user.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({ user_id: userId }) // Replace 1 with the actual user ID
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error("Error:", error));
        
    }
}

