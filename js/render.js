/*
 * Renders an analysis object into the results card.
 * Reads from the data shapes defined in data.js.
 */

/**
 * Builds one <tr> for a single category.
 */
function buildCategoryRow(key, category) {
  const row = document.createElement("tr");
  row.dataset.score = category.score;

  const nameCell = document.createElement("th");
  nameCell.setAttribute("scope", "row");
  nameCell.textContent = CATEGORY_NAMES[key];

  const badgeCell = document.createElement("td");
  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = category.score + " — " + RISK_LABELS[category.score];
  badgeCell.appendChild(badge);

  const rationaleCell = document.createElement("td");
  rationaleCell.textContent = category.rationale;

  row.append(nameCell, badgeCell, rationaleCell);
  return row;
}

/**
 * Fills the results card with an analysis object.
 */
function renderAnalysis(analysis) {
  document.querySelector("#site-name").textContent = analysis.site;
  document.querySelector("#analyzed-date").textContent =
    "Analyzed " + formatDate(analysis.analyzedAt);

  const scoreEl = document.querySelector("#overall-score");
  scoreEl.textContent = analysis.overallScore.toFixed(1);
  scoreEl.closest(".score").dataset.overall = analysis.overallScore;

  const tbody = document.querySelector("#category-rows");
  tbody.replaceChildren();

  CATEGORY_ORDER.forEach(function (key) {
    tbody.appendChild(buildCategoryRow(key, analysis.categories[key]));
  });

  document.querySelector("#summary-text").textContent = analysis.summary;
}

/**
 * Turns "2026-10-21" into "October 21, 2026".
 */
function formatDate(isoDate) {
  const parts = isoDate.split("-");
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
