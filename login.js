document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    var email = document.getElementById('username').value.trim();
    var password = document.getElementById('password').value.trim();

    // Validate the email format
    if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        return;
    }

    // Validate password length
    if (password.length < 8) { // ✅ Fixed syntax issue
        alert("Password must be at least 8 characters long.");
        return;
    }
    if (password.length > 50) {
        alert("Password is too long.");
        return;
    }

    // Validate that the password has at least one digit
    if (!/\d/.test(password)) {
        alert("Password must contain at least one digit.");
        return;
    }

    // Validate that the password has at least one letter
    if (!/[a-zA-Z]/.test(password)) {
        alert("Password must contain at least one letter.");
        return;
    }
    
    // Validate that the password has at least one special character from a defined set
    if (!/[!@#$%^&*()_+\.\,\;\:]/.test(password)) {
        alert("Password must contain at least 1 special character.");
        return;
    }

    // Ensure the password does not contain any invalid characters
    if (/[^a-zA-Z0-9!@#$%^&*()_+\.\,\;\:]/.test(password)) {
        alert("Password contains invalid characters.");
        return;
    }

    // *🚀 Send Login Request to Server*
    fetch('http://localhost/brgysysreq/loginadmin.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}` // ✅ Fixed incorrect body format
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Login successful!");
            window.location.href = 'dashboard.html'; // ✅ Redirect to dashboard
        } else {
            alert("Login failed: " + (data.error || "Invalid credentials."));
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Failed to connect to the server.");
    });
});

// *Toggle Password Visibility*
document.addEventListener('DOMContentLoaded', function () {
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');

    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }
});
