document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("chart-canvas").getContext("2d");

  const stockChart = new Chart(ctx, {
      type: "line",
      data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [{
              label: "Stock Price",
              data: [150, 160, 155, 170, 165, 180], // Example data
              borderColor: "#ff0000",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              borderWidth: 2,
              pointRadius: 4,
              pointBackgroundColor: "#ff0000",
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
              x: {
                  ticks: { color: "#fff" },
                  grid: { color: "#333" },
              },
              y: {
                  ticks: { color: "#fff" },
                  grid: { color: "#333" },
              }
          }
      }
  });

  // Function to update the chart on button click
  function updateChartData(interval) {
      const newData = {
          "1 Month": [150, 152, 148, 155, 158, 160],
          "3 Month": [140, 145, 150, 155, 160, 170],
          "1 Year": [120, 130, 140, 150, 160, 180],
          "5 Years": [90, 110, 130, 150, 170, 200]
      };

      stockChart.data.datasets[0].data = newData[interval];
      stockChart.update();
  }

  document.getElementById("btn1d").addEventListener("click", () => updateChartData("1 Month"));
  document.getElementById("btn1mo").addEventListener("click", () => updateChartData("3 Month"));
  document.getElementById("btn1y").addEventListener("click", () => updateChartData("1 Year"));
  document.getElementById("btn5y").addEventListener("click", () => updateChartData("5 Years"));
});
