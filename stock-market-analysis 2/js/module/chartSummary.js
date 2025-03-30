import { urlForSummary } from "./urls.js";
import fetchData from "./api.js";
import {
  currRenderedChartData,
  updateCurrChartState,
  updateSummaryData,
} from "../index.js";
function renderChartSummary() {
  updateCurrChartState();
  let { stockName, stockProfit, stockBV, stockSummary } = currRenderedChartData;
  const chartdetails = document.getElementById("chart-details");
  console.log("renderSummary");
  //console.log(currRenderedChartData);
  let className = "green";
  if (stockProfit <= 0) {
    className = "red";
  }
  const summHTML = ` <div class="cd-hdr">
  <h3>
    <span id="st-name">${stockName}</span>
    <span id="st-pf" class=${className}>${stockProfit}%</span>
    <span id="st-bv">$${stockBV}</span>
  </h3>
  <p id="st-summ">
  ${stockSummary}
  </p>
</div>`;
  chartdetails.innerHTML = summHTML;
}
function handleSummData(res) {
  //console.log(res);
  let { stocksProfileData } = res;
  //console.log(stocksProfileData);
  if (stocksProfileData.length > 0) {
    delete stocksProfileData[0]._id;
    updateSummaryData(stocksProfileData[0]);
  }
  renderChartSummary(currRenderedChartData);
}

function fetchDataForChartSummary() {
  fetchData(
    urlForSummary,
    {
      methods: "GET",
    },
    handleSummData
  );
}

export { fetchDataForChartSummary, renderChartSummary };
