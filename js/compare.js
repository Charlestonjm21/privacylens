/*
 * Builds the compare table from two selected analyses.
 */

/**
 * Returns every analysis available to compare — the mock set
 * plus anything in history.
 */
function getComparable() {
  const byName = {};

  Object.keys(MOCK_ANALYSES).forEach(function (key) {
    byName[MOCK_ANALYSES[key].site] = MOCK_ANALYSES[key];
  });

  getHistory().forEach(function (entry) {
    byName[entry.site] = entry;
  });

  return byName;
}

/**
 * Fills a <select> with one option per available site.
 */
function populateSelect(select, sites, selectedSite) {
  select.replaceChildren();

  sites.forEach(function (site) {
    const option = document.createElement("option");
    option.value = site;
    option.textContent = site;
    if (site === selectedSite) option.selected = true;
    select.appendChild(option);
  });
}

/**
 * Builds a single <td> holding a risk badge.
 */
function buildScoreCell(score, label) {
  const cell = document.createElement("td");
  cell.dataset.score = Math.round(score);

  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = label;

  cell.appendChild(badge);
  return cell;
}

/**
 * Redraws the comparison table for two analyses.
 */
function renderComparison(left, right) {
  document.querySelector("#left-heading").textContent = left.site;
  document.querySelector("#right-heading").textContent = right.site;

  const tbody = document.querySelector("#compare-rows");
  tbody.replaceChildren();

  CATEGORY_ORDER.forEach(function (key) {
    const row = document.createElement("tr");

    const nameCell = document.createElement("th");
    nameCell.setAttribute("scope", "row");
    nameCell.textContent = CATEGORY_NAMES[key];

    const leftScore = left.categories[key].score;
    const rightScore = right.categories[key].score;

    row.append(
      nameCell,
      buildScoreCell(leftScore, leftScore + " — " + RISK_LABELS[leftScore]),
      buildScoreCell(rightScore, rightScore + " — " + RISK_LABELS[rightScore])
    );

    tbody.appendChild(row);
  });

  const totalRow = document.createElement("tr");
  totalRow.className = "compare-total";

  const totalLabel = document.createElement("th");
  totalLabel.setAttribute("scope", "row");
  totalLabel.textContent = "Overall";

  totalRow.append(
    totalLabel,
    buildScoreCell(
      left.overallScore,
      left.overallScore.toFixed(1) + " — " + RISK_LABELS[Math.round(left.overallScore)]
    ),
    buildScoreCell(
      right.overallScore,
      right.overallScore.toFixed(1) + " — " + RISK_LABELS[Math.round(right.overallScore)]
    )
  );

  tbody.appendChild(totalRow);
}

document.addEventListener("DOMContentLoaded", function () {
  const leftSelect = document.querySelector("#left-select");
  if (!leftSelect) return;

  const rightSelect = document.querySelector("#right-select");
  const available = getComparable();
  const sites = Object.keys(available);

  if (sites.length < 2) {
    document.querySelector("#compare-main").hidden = true;
    document.querySelector("#compare-empty").hidden = false;
    return;
  }

  populateSelect(leftSelect, sites, sites[0]);
  populateSelect(rightSelect, sites, sites[1]);

  function update() {
    renderComparison(
      available[leftSelect.value],
      available[rightSelect.value]
    );
  }

  leftSelect.addEventListener("change", update);
  rightSelect.addEventListener("change", update);

  update();
});
