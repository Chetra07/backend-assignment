// Fetch product count
fetch("http://localhost/web-assignment-main/backend/api/product/count.php")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("productCount").innerText = data.count;
  })
  .catch((error) => console.error("Error fetching product count:", error));

// Fetch user count
fetch("http://localhost/web-assignment-main/backend/api/user/count.php")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("userCount").innerText = data.count;
  })
  .catch((error) => console.error("Error fetching user count:", error));

// Fetch category count
fetch("http://localhost/web-assignment-main/backend/api/category/count.php")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("categoryCount").innerText = data.count;
  })
  .catch((error) => console.error("Error fetching category count:", error));

// Fetch data from the product count API
fetch("http://localhost/web-assignment-main/backend/api/product/count.php")
  .then((response) => response.json())
  .then((productData) => {
    const productCount = productData.count;

    fetch("http://localhost/web-assignment-main/backend/api/user/count.php")
      .then((response) => response.json())
      .then((userData) => {
        const userCount = userData.count;

        fetch(
          "http://localhost/web-assignment-main/backend/api/category/count.php"
        )
          .then((response) => response.json())
          .then((categoryData) => {
            const categoryCount = categoryData.count;

            const totalCount = productCount + userCount + categoryCount;
            const productPercentage = (productCount / totalCount) * 100;
            const userPercentage = (userCount / totalCount) * 100;
            const categoryPercentage = (categoryCount / totalCount) * 100;

            renderPieChart(
              productPercentage,
              userPercentage,
              categoryPercentage
            );
          })
          .catch((error) =>
            console.error("Error fetching category count:", error)
          );
      })
      .catch((error) => console.error("Error fetching user count:", error));
  })
  .catch((error) => console.error("Error fetching product count:", error));

function renderPieChart(productPercentage, userPercentage, categoryPercentage) {
  const chartOptions = {
    series: [productPercentage, userPercentage, categoryPercentage],
    chart: {
      type: "pie",
    },
    labels: ["Product Count", "User Count", "Category Count"],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(2) + "%";
      },
    },
    legend: {
      position: "bottom",
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (count) {
          return count.toFixed(2) + "%";
        },
      },
    },
  };

  // Render the chart
  const chart = new ApexCharts(
    document.getElementById("pie-chart"),
    chartOptions
  );
  chart.render();
}

function renderBarChart(productCount, userCount, categoryCount) {
  const chartOptions = {
    series: [
      {
        name: "Product Count",
        data: [productCount],
      },
      {
        name: "User Count",
        data: [userCount],
      },
      {
        name: "Category Count",
        data: [categoryCount],
      },
    ],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(2);
      },
    },
    xaxis: {
      categories: ["Count"],
    },
  };

  // Render the chart
  const chart = new ApexCharts(
    document.getElementById("bar-chart"),
    chartOptions
  );
  chart.render();
}

// Fetch data and render the bar chart
fetch("http://localhost/web-assignment-main/backend/api/product/count.php")
  .then((response) => response.json())
  .then((productData) => {
    const productCount = productData.count;

    fetch("http://localhost/web-assignment-main/backend/api/user/count.php")
      .then((response) => response.json())
      .then((userData) => {
        const userCount = userData.count;

        fetch(
          "http://localhost/web-assignment-main/backend/api/category/count.php"
        )
          .then((response) => response.json())
          .then((categoryData) => {
            const categoryCount = categoryData.count;

            renderBarChart(productCount, userCount, categoryCount);
          })
          .catch((error) =>
            console.error("Error fetching category count:", error)
          );
      })
      .catch((error) => console.error("Error fetching user count:", error));
  })
  .catch((error) => console.error("Error fetching product count:", error));
