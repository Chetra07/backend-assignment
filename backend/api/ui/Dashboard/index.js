// Fetch product count
fetch("http://localhost/web-assignment-main/backend/api/product/count.php")
    .then(response => response.json())
    .then(data => {
        document.getElementById("productCount").innerText = data.count;
    })
    .catch(error => console.error("Error fetching product count:", error));

// Fetch user count
fetch("http://localhost/web-assignment-main/backend/api/user/count.php")
    .then(response => response.json())
    .then(data => {
        document.getElementById("userCount").innerText = data.count;
    })
    .catch(error => console.error("Error fetching user count:", error));

// Fetch category count
fetch("http://localhost/web-assignment-main/backend/api/category/count.php")
    .then(response => response.json())
    .then(data => {
        document.getElementById("categoryCount").innerText = data.count;
    })
    .catch(error => console.error("Error fetching category count:", error));
