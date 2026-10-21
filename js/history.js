/*
 * Renders the history list and toggles the empty state.
 */

/**
 * Returns the saved analyses as an array, newest first.
 */
function getHistory() {
  const raw = sessionStorage.getItem("history");
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

/**
 * Adds an analysis to history, replacing any earlier entry
 * for the same site.
 */
function addToHistory(analysis) {
  const entries = getHistory().filter(function (entry) {
    return entry.site !== analysis.site;
  });
  entries.unshift(analysis);
  sessionStorage.setItem("history", JSON.stringify(entries));
}

/**
 * Builds one <li> for a saved analysis.
 */
function buildHistoryItem(analysis) {
  const item = document.createElement("li");
  item.className = "history-item";
  item.dataset.score = Math.round(analysis.overallScore);

  const main = document.createElement("div");
  main.className = "history-main";

  const link = document.createElement("a");
  link.className = "history-site";
  link.href = "results.html";
  link.textContent = analysis.site;
  link.addEventListener("click", function () {
    sessionStorage.setItem("currentAnalysis", JSON.stringify(analysis));
  });

  const date = document.createElement("span");
  date.className = "history-date";
  date.textContent = formatDate(analysis.analyzedAt);

  main.append(link, date);

  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent =
    analysis.overallScore.toFixed(1) +
    " — " +
    RISK_LABELS[Math.round(analysis.overallScore)];

  item.append(main, badge);
  return item;
}

document.addEventListener("DOMContentLoaded", function () {
  const list = document.querySelector("#history-list");
  if (!list) return;

  const emptyState = document.querySelector("#history-empty");
  const entries = getHistory();

  list.replaceChildren();

  if (entries.length === 0) {
    list.hidden = true;
    emptyState.hidden = false;
    return;
  }

  list.hidden = false;
  emptyState.hidden = true;

  entries.forEach(function (analysis) {
    list.appendChild(buildHistoryItem(analysis));
  });
});
