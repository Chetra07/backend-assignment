document.addEventListener('DOMContentLoaded', function() {
    // Get the login form element
    const loginForm = document.getElementById("loginform");

    // Add event listener for form submission
    loginForm.addEventListener("submit", function(event) {
        // Prevent default form submission
        event.preventDefault();

        // Retrieve the values of the username and password fields
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Create a FormData object to send data via AJAX
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        // Send AJAX request to the login PHP script
        fetch("http://localhost/web-assignment-main/backend/api/user/login.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Check if login was successful
            if (data.success) {
                // Redirect the user to the home page
                window.location.href = "http://127.0.0.1:5502/frontend/index1.html#";
            } else {
                // Display an error message or handle the response accordingly
                alert(data.message);
            }
        })
        .catch(error => {
            console.error("Error logging in:", error);
        });
    });
});
