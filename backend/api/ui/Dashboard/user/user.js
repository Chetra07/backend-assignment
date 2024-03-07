fetchUsers();
function fetchUsers() {
    fetch("http://localhost/web-assignment-main/backend/api/user/fetch_user.php")
        .then((response) => response.json())
        .then((data) => {
            // Check if data is available and has users
            if (data.users && data.users.length > 0) {
                // Sort users based on their IDs in descending order
                const sortedUsers = data.users.sort((a, b) => b.id - a.id);

                // Get the table body element
                const usersTableBody = document.getElementById("usersTableBody");

                // Clear existing rows
                usersTableBody.innerHTML = "";

                // Iterate over the sorted users and create table rows
                sortedUsers.forEach((user) => {
                    // Create a table row with user details
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.username}</td>
                        <td>${user.password}</td>
                        <td>
                          <button onclick="openUpdateModal('${user.id}','${user.name}','${user.username}','${user.password}')" class="edit-button">Edit</button>
                          <button onclick="deleteUser(${user.id})" class="delete-button">Delete</button>
                        </td>
                    `;
                    usersTableBody.appendChild(row); // Append the row to the table body
                });
            } else {
                // No users found, display a message
                const usersTableBody = document.getElementById("usersTableBody");
                usersTableBody.innerHTML = `<tr><td colspan="4">${data.message}</td></tr>`;
            }
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
}


function createUser() {
    const form = document.getElementById("userForm");
    const formData = new FormData(form);

    fetch("http://localhost/web-assignment-main/backend/api/user/register.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); // Display the response message
        closeModal(); // Close the modal
        fetchUsers(); // Reload the user data in the table
    })
    .catch(error => {
        console.error("Error creating user:", error);
    });
}


// Function to display the modal
function openModal() {
  


    document.getElementById("userModal").style.display = "block";
}

// Function to close the modal
function closeModal() {
    document.getElementById("userModal").style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById("userModal");
    if (event.target == modal) {
        closeModal();
    }
}


function deleteUser(userId) {
    const confirmation = confirm("Are you sure you want to delete this user?");
    if (confirmation) {
        fetch(`http://localhost/web-assignment-main/backend/api/user/delete.php?user_id=${userId}`, {
            method: "DELETE",
        })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            fetchUsers(); // Assuming you have a function named fetchUsers() to refresh the user list
        })
        .catch((error) => {
            console.error("Error deleting user:", error);
        });
    }
}

// Function to open the update user modal
// Function to open the update user modal
function openUpdateModal(id , name , username , password) {
    const updateUserId = document.getElementById("updateUserId");
    const updateName = document.getElementById("updateName");
    const updateUsername = document.getElementById("updateUsername");
    const updatePassword = document.getElementById("updatePassword");

    if (updateUserId && updateName && updateUsername && updatePassword) {
        updateUserId.value = id;
        updateName.value = name;
        updateUsername.value = username;
        updatePassword.value = password;
        document.getElementById("userUpdateModal").style.display = "block"; // Corrected this line
    } else {
        console.error("One or more elements not found.");
    }
}

document.getElementById("updateUserForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission behavior
  
    const id = document.getElementById("updateUserId").value;
    const name = document.getElementById("updateName").value;
    const username = document.getElementById("updateUsername").value;
    const password = document.getElementById("updatePassword").value;
    
    const formData = new FormData();
    formData.append("id", id); // Changed this line to match the key in your PHP script
    formData.append("name", name);
    formData.append("username", username);
    formData.append("password", password);
  
    fetch("http://localhost/web-assignment-main/backend/api/user/update.php", {
        method: "POST",
        body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
        alert(data.message);
        fetchUsers(); // Refresh user list after updating
        closeUpdateModal(); // Close the update modal after updating
    })
    // .catch((error) => {
    //     console.error("Error updating user:", error);
    // });
});

// Function to close the update user modal
function closeUpdateModal() {
    document.getElementById("userUpdateModal").style.display = "none";
}


