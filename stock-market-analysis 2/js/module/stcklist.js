import { urlForList } from "./urls.js";
import fetchData from "./api.js";

import {
  stocksStatsData,
  updateStatsData,
  currRenderedChartData,
  updateCurrChartState,
} from "../index.js";
import { renderChart } from "./chart.js";
import { renderChartSummary } from "./chartSummary.js";
function renderStocksList() {
  //console.log(data);
  const secChartList = document.getElementById("sec-chart-list");

  const ulEl = document.createElement("ul");
  let data = stocksStatsData;
  for (let key of Object.keys(data)) {
    const liEl = document.createElement("li");
    let name = key;
    let { profit, bookValue } = data[key];
    let nSpan = document.createElement("span");

    let pSpan = document.createElement("span");
    if (profit <= 0) {
      pSpan.classList.add("red");
    } else {
      pSpan.classList.add("green");
    }
    let bvSpan = document.createElement("span");
    nSpan.textContent = name;
    pSpan.textContent = profit;
    bvSpan.textContent = bookValue;

    liEl.appendChild(nSpan);
    liEl.appendChild(bvSpan);
    liEl.appendChild(pSpan);
    ulEl.appendChild(liEl);

    //add event listenr to name span i.e stock list name
    nSpan.addEventListener("click", (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      handleStockListNameClickListener(name);
    });
  }
  secChartList.innerHTML = "";
  secChartList.appendChild(ulEl);
}

function handleStockListNameClickListener(name) {
  //console.log(`${name} is clicked.`);
  //update current currRenderedChartData name
  currRenderedChartData.stockName = name;
  updateCurrChartState();
  //render chart
  renderChart();
  //render summary
  renderChartSummary();
}
function handleChartData(res) {
  let { stocksStatsData } = res;
  if (stocksStatsData.length > 0) {
    delete stocksStatsData[0]._id;
    updateStatsData(stocksStatsData[0]);
  }
  renderStocksList();
}
function fetchStocksStatsData() {
  fetchData(urlForList, { methods: "GET" }, handleChartData);
}

//add listener to
export { fetchStocksStatsData, renderStocksList };
