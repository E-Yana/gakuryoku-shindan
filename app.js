// ============================================================
// がくりょく しんだん（算数・社会 単元別 かんい判定テスト）
//   - 毎日の反復学習アプリではなく、Week0（対策前）・Week6（対策後）に
//     実施する「判定テスト」。単元(unit)ごとの正答率を集計し苦手マップを出す
//   - 履歴は localStorage に受験日つきで保存し、before/afterを比較できる
//   - 詳細: reports/kids/算数図形_改善プログラム_202608.md
// ============================================================

"use strict";

const STORE_KEY = "gakuryokuShindan_v1";
const WEAK_THRESHOLD = 0.6; // この正答率未満の単元を「苦手」として赤ハイライト

const SUBJECTS = {
  sansu: { label: "算数", bankKey: "SANSU_PROBLEMS" },
  shakai: { label: "社会", bankKey: "SHAKAI_PROBLEMS" },
};

// --- 日付ユーティリティ --------------------------------------
function todayStr() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// --- ストア（永続化） ----------------------------------------
let store = loadStore();

function loadStore() {
  const init = { history: { sansu: [], shakai: [] } };
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return init;
    const parsed = JSON.parse(raw);
    return { history: Object.assign(init.history, parsed.history || {}) };
  } catch (e) {
    console.warn("ストア読込に失敗。初期化します", e);
    return init;
  }
}

function saveStore() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch (e) {
    alert("保存に失敗しました。ブラウザの空き容量をご確認ください。");
    console.error(e);
  }
}

// --- 問題バンク ------------------------------------------------
function bankFor(subject) {
  return window[SUBJECTS[subject].bankKey] || [];
}

// --- 共通ユーティリティ ----------------------------------------
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ============================================================
// 画面制御
// ============================================================
const screens = ["home", "quiz", "result"];
function showScreen(name) {
  screens.forEach((s) => {
    const el = document.getElementById("screen-" + s);
    if (el) el.classList.toggle("hidden", s !== name);
  });
  window.scrollTo(0, 0);
}

// --- ホーム画面 ----------------------------------------------
function renderHome() {
  renderHistorySummary("sansu", "home-history-sansu");
  renderHistorySummary("shakai", "home-history-shakai");
  showScreen("home");
}

/** 履歴の簡易サマリー（受験回数・直近の結果）をホームに表示 */
function renderHistorySummary(subject, elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  const list = store.history[subject] || [];
  if (list.length === 0) {
    el.innerHTML = '<p class="muted small">まだ受けていません。</p>';
    return;
  }
  const last = list[list.length - 1];
  el.innerHTML =
    `<p class="small">受験回数: ${list.length}回／直近: ${escapeHtml(last.date)}（${last.correct}/${last.total}）</p>`;
}

// --- クイズ画面 ----------------------------------------------
let quizState = null; // { subject, ids, index, results:{}, choiceOrder:{} }

function startQuiz(subject) {
  const bank = bankFor(subject);
  if (bank.length === 0) {
    alert("問題データが読み込まれていません。");
    return;
  }
  const ids = shuffleArray(bank.map((p) => p.id));
  quizState = { subject, ids, index: 0, results: {} };
  showQuestion();
}

function problemById(subject, id) {
  return bankFor(subject).find((p) => p.id === id) || null;
}

function showQuestion() {
  const { subject, ids, index } = quizState;
  const p = problemById(subject, ids[index]);
  if (!p) {
    nextQuestion();
    return;
  }
  document.getElementById("quiz-progress").textContent = `${index + 1} / ${ids.length}`;
  document.getElementById("quiz-subject-label").textContent = SUBJECTS[subject].label;
  document.getElementById("quiz-unit-label").textContent = p.unit;
  document.getElementById("quiz-question").textContent = p.question;
  document.getElementById("quiz-feedback").classList.add("hidden");

  const choices = shuffleArray([p.answer, ...p.distractors]);
  const box = document.getElementById("quiz-choices");
  box.innerHTML = "";
  choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice-btn";
    btn.textContent = choice;
    btn.addEventListener("click", () => selectChoice(choice, p, btn));
    box.appendChild(btn);
  });
  showScreen("quiz");
}

function selectChoice(choice, p, btnEl) {
  const ok = choice === p.answer;
  document.querySelectorAll("#quiz-choices .choice-btn").forEach((b) => {
    b.disabled = true;
    if (b.textContent === p.answer) b.classList.add("ok");
    else if (b === btnEl && !ok) b.classList.add("ng");
  });

  quizState.results[p.id] = { ok, unit: p.unit };

  document.getElementById("quiz-feedback-msg").textContent = ok ? "せいかい！🎉" : "おしい！";
  document.getElementById("quiz-explanation").textContent = p.explanation || "";
  document.getElementById("quiz-feedback").classList.remove("hidden");
}

function nextQuestion() {
  quizState.index += 1;
  if (quizState.index >= quizState.ids.length) {
    finishQuiz();
  } else {
    showQuestion();
  }
}

function quitQuiz() {
  quizState = null;
  renderHome();
}

// --- 結果画面（苦手マップ） ------------------------------------
function finishQuiz() {
  const { subject, results } = quizState;
  const ids = Object.keys(results);
  const okCount = ids.filter((id) => results[id].ok).length;
  const total = ids.length;

  // 単元ごとに集計
  const byUnit = {};
  ids.forEach((id) => {
    const { ok, unit } = results[id];
    if (!byUnit[unit]) byUnit[unit] = { correct: 0, total: 0 };
    byUnit[unit].total += 1;
    if (ok) byUnit[unit].correct += 1;
  });

  // 履歴に保存（受験日つき）
  const record = { date: todayStr(), correct: okCount, total, byUnit };
  store.history[subject].push(record);
  saveStore();

  renderResult(subject, record);
}

function renderResult(subject, record) {
  document.getElementById("result-subject-label").textContent = SUBJECTS[subject].label;
  document.getElementById("result-score").textContent = `${record.correct} / ${record.total}`;

  const ratio = record.total ? record.correct / record.total : 0;
  let msg = "よくがんばったね！";
  if (ratio === 1) msg = "全部できた！すごい！🎉";
  else if (ratio >= 0.7) msg = "いいちょうし！この調子！👍";
  else msg = "だいじょうぶ、これから得意にしていこう！";
  document.getElementById("result-msg").textContent = msg;

  // 単元別の正答率（低い順＝苦手順）に並べる
  const units = Object.entries(record.byUnit)
    .map(([unit, c]) => ({ unit, correct: c.correct, total: c.total, pct: c.total ? c.correct / c.total : 0 }))
    .sort((a, b) => a.pct - b.pct);

  const box = document.getElementById("result-unit-map");
  if (units.length === 0) {
    box.innerHTML = '<p class="muted">単元データがありません。</p>';
  } else {
    const top = units[0];
    box.innerHTML =
      (top.pct < WEAK_THRESHOLD
        ? `<p class="priority-note">🎯 最優先で対策すべき単元: <strong>${escapeHtml(top.unit)}</strong>（正答率 ${Math.round(top.pct * 100)}%）</p>`
        : `<p class="priority-note ok-note">👏 大きな苦手単元は見つかりませんでした</p>`) +
      "<table class='unit-table'><thead><tr><th>単元</th><th>正答</th><th>正答率</th></tr></thead><tbody>" +
      units
        .map(
          (u) =>
            `<tr class="${u.pct < WEAK_THRESHOLD ? "weak-row" : ""}">` +
            `<td>${escapeHtml(u.unit)}</td>` +
            `<td>${u.correct}/${u.total}</td>` +
            `<td>${Math.round(u.pct * 100)}%</td>` +
            `</tr>`
        )
        .join("") +
      "</tbody></table>";
  }

  // 前回との比較（before/after）
  renderComparison(subject);

  showScreen("result");
}

/** 同じ教科の過去2回分を比較表示（Week0 vs Week6 の before/after 用） */
function renderComparison(subject) {
  const box = document.getElementById("result-compare");
  const list = store.history[subject] || [];
  if (list.length < 2) {
    box.innerHTML = "";
    return;
  }
  const prev = list[list.length - 2];
  const curr = list[list.length - 1];
  const units = new Set([...Object.keys(prev.byUnit), ...Object.keys(curr.byUnit)]);
  const rows = Array.from(units).map((unit) => {
    const p = prev.byUnit[unit];
    const c = curr.byUnit[unit];
    const pPct = p && p.total ? Math.round((p.correct / p.total) * 100) : null;
    const cPct = c && c.total ? Math.round((c.correct / c.total) * 100) : null;
    const delta = pPct !== null && cPct !== null ? cPct - pPct : null;
    return { unit, pPct, cPct, delta };
  });
  box.innerHTML =
    `<h3>前回（${escapeHtml(prev.date)}）との比較</h3>` +
    "<table class='unit-table'><thead><tr><th>単元</th><th>前回</th><th>今回</th><th>変化</th></tr></thead><tbody>" +
    rows
      .map(
        (r) =>
          `<tr><td>${escapeHtml(r.unit)}</td>` +
          `<td>${r.pPct === null ? "-" : r.pPct + "%"}</td>` +
          `<td>${r.cPct === null ? "-" : r.cPct + "%"}</td>` +
          `<td>${r.delta === null ? "-" : (r.delta > 0 ? "+" : "") + r.delta + "%"}</td></tr>`
      )
      .join("") +
    "</tbody></table>";
}

// ============================================================
// イベント結線・初期化
// ============================================================
function bindEvents() {
  document.getElementById("btn-start-sansu").addEventListener("click", () => startQuiz("sansu"));
  document.getElementById("btn-start-shakai").addEventListener("click", () => startQuiz("shakai"));
  document.getElementById("btn-quiz-quit").addEventListener("click", quitQuiz);
  document.getElementById("btn-quiz-next").addEventListener("click", nextQuestion);
  document.getElementById("btn-result-home").addEventListener("click", renderHome);
}

function main() {
  bindEvents();
  renderHome();

  if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persist().catch(() => {});
  }
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").catch((e) => console.warn("SW登録失敗", e));
  }
}

document.addEventListener("DOMContentLoaded", main);
