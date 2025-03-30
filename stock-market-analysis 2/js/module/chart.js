import { urlForCharts } from "./urls.js";
import fetchData from "./api.js";
import {
  updateChartData,
  currRenderedChartData,
  stocksChartData,
  updateChartCurrInterval,
} from "../index.js";
import CHART_COLORS from "../utils/chartColors.js";
import { timeStampTodate } from "../utils/util.js";
let myChart = null;

function getDataSetForChart() {
  const label = currRenderedChartData.stockName;
  const interval = currRenderedChartData.interval;
  const intervals = stocksChartData[label][interval].timeStamp;
  const intervalsDate = timeStampTodate(intervals);
  const data = stocksChartData[label][interval].value;
  /*   console.log("getDataSetForChart");
  console.log(stocksChartData);
  console.log(label);
  console.log(intervalsDate);
  console.log(data); */
  const dataForChart = {
    labels: intervalsDate,
    datasets: [
      {
        label,
        data,
        borderColor: CHART_COLORS.borderColor,
        backgroundColor: CHART_COLORS.backgroundColor,
      },
    ],
  };

  return dataForChart;
}

function renderChart() {
  //console.log(data);

  console.log("renderChart()");
  console.log(currRenderedChartData);
  const ctx = document.getElementById("chart-canvas");

  const dataSet = getDataSetForChart();
  const config = {
    type: "line",
    data: dataSet,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Line Chart",
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
    },
  };
  if (myChart !== null) {
    myChart.destroy();
  }
  myChart = new Chart(ctx, config);
}

function handleChartData(res) {
  //console.log("handleChartData");

  let { stocksData } = res;
  //console.log(stocksData);
  if (stocksData.length > 0) {
    delete stocksData[0]._id;
    updateChartData(stocksData[0]);
  }

  renderChart();
}
function fetchChartData() {
  fetchData(urlForCharts, { methods: "GET" }, handleChartData);
}

const onedaybtn = document.getElementById("btn1d");
const onemonbtn = document.getElementById("btn1mo");
const oneyrbtn = document.getElementById("btn1y");
const fiveyrbtn = document.getElementById("btn5y");
function createChartForInterval(interval) {
  console.log("draw chat for interval::", interval);
  updateChartCurrInterval(interval);
  renderChart();
}
onedaybtn.addEventListener("click", () => {
  createChartForInterval("1mo");
});
onemonbtn.addEventListener("click", () => {
  createChartForInterval("3mo");
});
oneyrbtn.addEventListener("click", () => {
  createChartForInterval("1y");
});
fiveyrbtn.addEventListener("click", () => {
  createChartForInterval("5y");
});

//resize chart
/* window.addEventListener("resize", () => {
  const $chartContainer = document.getElementById("chart");
  const wCharCont = $chartContainer.offsetWidth;
  const hChartCont = $chartContainer.offsetHeight;
  myChart.resize(wCharCont , hChartCont);
}); */

export { fetchChartData, renderChart };
