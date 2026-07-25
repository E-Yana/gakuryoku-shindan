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
  // learned: 教科ごとの「ならった単元」リスト（未設定なら全単元を対象とする）
  const init = { history: { sansu: [], shakai: [] }, learned: {} };
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return init;
    const parsed = JSON.parse(raw);
    return {
      history: Object.assign(init.history, parsed.history || {}),
      learned: Object.assign(init.learned, parsed.learned || {}),
    };
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
const screens = ["home", "scope", "quiz", "result", "history"];
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

// --- 範囲えらび画面（未習単元を出題から外す） --------------------
// 未習の単元を出題すると必ず正答率0%になり「最優先で対策すべき単元」を
// 乗っ取ってしまうため、受験前に習った範囲だけを選ばせる
let scopeSubject = null;

/** 問題バンクに登場する単元名を出現順で返す */
function unitsOf(subject) {
  const seen = [];
  bankFor(subject).forEach((p) => {
    if (!seen.includes(p.unit)) seen.push(p.unit);
  });
  return seen;
}

/** 保存済みの「ならった単元」。未設定・不整合なら全単元にフォールバック */
function learnedUnits(subject) {
  const all = unitsOf(subject);
  const saved = store.learned[subject];
  if (!Array.isArray(saved)) return all;
  const valid = saved.filter((u) => all.includes(u)); // 問題追加/改名で消えた単元を除去
  return valid.length > 0 ? valid : all;
}

function openScope(subject) {
  scopeSubject = subject;
  document.getElementById("scope-subject-label").textContent = SUBJECTS[subject].label;

  const selected = learnedUnits(subject);
  const box = document.getElementById("scope-list");
  box.innerHTML = "";
  unitsOf(subject).forEach((unit) => {
    const label = document.createElement("label");
    label.className = "scope-item";
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.value = unit;
    cb.checked = selected.includes(unit);
    const span = document.createElement("span");
    span.textContent = unit;
    label.appendChild(cb);
    label.appendChild(span);
    box.appendChild(label);
  });
  showScreen("scope");
}

function selectedScopeUnits() {
  return Array.from(document.querySelectorAll("#scope-list input[type=checkbox]"))
    .filter((el) => el.checked)
    .map((el) => el.value);
}

function toggleAllScope(on) {
  document.querySelectorAll("#scope-list input[type=checkbox]").forEach((el) => {
    el.checked = on;
  });
}

function startFromScope() {
  const units = selectedScopeUnits();
  if (units.length === 0) {
    alert("すくなくとも 1つは えらんでね。");
    return;
  }
  store.learned[scopeSubject] = units; // 次回以降の初期値として記憶
  saveStore();
  startQuiz(scopeSubject, units);
}

// --- クイズ画面 ----------------------------------------------
let quizState = null; // { subject, ids, index, results:{}, units:[] }

function startQuiz(subject, units) {
  const bank = bankFor(subject).filter((p) => units.includes(p.unit));
  if (bank.length === 0) {
    alert("問題データが読み込まれていません。");
    return;
  }
  const ids = shuffleArray(bank.map((p) => p.id));
  quizState = { subject, ids, index: 0, results: {}, units };
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

  // 誤答の中身（何と答えたか）まで残す。単元別正答率だけでは
  // 「何が分かっていないか」が分からず、ドリル選定に使えないため
  quizState.results[p.id] = { ok, unit: p.unit, chosen: choice, question: p.question, answer: p.answer };

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
let currentResultView = null; // { subject, record } 結果画面が今表示している記録

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

  // 誤答した問題の中身（ドリル選定の材料）。正答のみの回は空配列
  const wrongs = ids
    .filter((id) => !results[id].ok)
    .map((id) => ({
      id,
      unit: results[id].unit,
      question: results[id].question,
      answer: results[id].answer,
      chosen: results[id].chosen,
    }));

  // 履歴に保存（受験日つき）
  const record = { date: todayStr(), correct: okCount, total, byUnit, units: quizState.units, wrongs };
  const list = store.history[subject];
  const prev = list.length > 0 ? list[list.length - 1] : null; // 保存前の最終回＝前回
  list.push(record);
  saveStore();

  renderResult(subject, record, prev);
}

/**
 * 結果画面を描画する。受験直後だけでなく履歴からの再表示にも使う。
 * @param {string} subject 教科キー
 * @param {object} record 表示する受験記録
 * @param {object|null} prevRecord 比較対象（1つ前の回）。無ければ比較表を出さない
 */
function renderResult(subject, record, prevRecord) {
  currentResultView = { subject, record }; // コピー機能が参照する
  document.getElementById("result-subject-label").textContent = SUBJECTS[subject].label;
  document.getElementById("result-score").textContent = `${record.correct} / ${record.total}`;

  const ratio = record.total ? record.correct / record.total : 0;
  let msg = "よくがんばったね！";
  if (ratio === 1) msg = "全部できた！すごい！🎉";
  else if (ratio >= 0.7) msg = "いいちょうし！この調子！👍";
  else msg = "だいじょうぶ、これから得意にしていこう！";
  document.getElementById("result-msg").textContent = msg;

  // 出題範囲（未習単元を外している場合に「全単元ではない」ことを明示する）
  const scopeNote = document.getElementById("result-scope-note");
  const allUnits = unitsOf(subject);
  const askedUnits = record.units || Object.keys(record.byUnit);
  scopeNote.textContent =
    askedUnits.length < allUnits.length
      ? `出題範囲: ${askedUnits.length}/${allUnits.length}単元（ならった範囲のみ）`
      : `出題範囲: 全${allUnits.length}単元`;

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

  // まちがえた問題（ドリル選定の材料）
  renderWrongs(record);

  // 前回との比較（before/after）
  renderComparison(prevRecord, record);

  // コピー用UIは表示のたびに初期状態へ戻す
  document.getElementById("copy-status").classList.add("hidden");
  const fallback = document.getElementById("copy-fallback");
  fallback.classList.add("hidden");
  fallback.value = "";

  showScreen("result");
}

/** 誤答した問題を「何と答えたか」つきで並べる（ドリル選定の材料） */
function renderWrongs(record) {
  const box = document.getElementById("result-wrongs");
  const wrongs = record.wrongs || []; // 旧レコードにはこのフィールドが無い
  if (wrongs.length === 0) {
    box.innerHTML = "";
    document.getElementById("result-wrongs-panel").classList.add("hidden");
    return;
  }
  document.getElementById("result-wrongs-panel").classList.remove("hidden");
  box.innerHTML =
    "<h2>まちがえた問題</h2>" +
    "<table class='unit-table'><thead><tr><th>単元</th><th>問題</th><th>正解</th><th>答えたもの</th></tr></thead><tbody>" +
    wrongs
      .map(
        (w) =>
          `<tr><td>${escapeHtml(w.unit)}</td><td>${escapeHtml(w.question)}</td>` +
          `<td>${escapeHtml(w.answer)}</td><td>${escapeHtml(w.chosen || "-")}</td></tr>`
      )
      .join("") +
    "</tbody></table>";
}

/** 2回分を並べて比較表示（Week0 vs Week6 の before/after 用） */
function renderComparison(prev, curr) {
  const box = document.getElementById("result-compare");
  if (!prev || !curr) {
    box.innerHTML = "";
    return;
  }
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

// --- 履歴画面（過去の結果を再表示） ----------------------------
/** 全教科の受験記録を新しい順に並べ、選ぶと結果画面を再描画する */
function renderHistory() {
  const box = document.getElementById("history-list");
  // {subject, record, index} へ平坦化し、日付の新しい順に並べる
  const entries = [];
  Object.keys(SUBJECTS).forEach((subject) => {
    (store.history[subject] || []).forEach((record, index) => {
      entries.push({ subject, record, index });
    });
  });
  entries.sort((a, b) => (a.record.date < b.record.date ? 1 : a.record.date > b.record.date ? -1 : b.index - a.index));

  if (entries.length === 0) {
    box.innerHTML = '<p class="muted small">まだ受けた記録がありません。</p>';
    showScreen("history");
    return;
  }

  box.innerHTML = "";
  entries.forEach((e) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "history-btn";
    const weak = weakUnitsOf(e.record);
    btn.innerHTML =
      `<span class="history-main">${escapeHtml(SUBJECTS[e.subject].label)}　${escapeHtml(e.record.date)}` +
      `　<strong>${e.record.correct}/${e.record.total}</strong></span>` +
      `<span class="history-sub">${weak.length ? "にがて: " + escapeHtml(weak.join("・")) : "にがて単元なし"}</span>`;
    // 比較対象は同じ教科の1つ前の回
    const prev = e.index > 0 ? store.history[e.subject][e.index - 1] : null;
    btn.addEventListener("click", () => renderResult(e.subject, e.record, prev));
    box.appendChild(btn);
  });
  showScreen("history");
}

/** 苦手しきい値を下回った単元名の配列（正答率の低い順） */
function weakUnitsOf(record) {
  return Object.entries(record.byUnit || {})
    .map(([unit, c]) => ({ unit, pct: c.total ? c.correct / c.total : 0 }))
    .filter((u) => u.pct < WEAK_THRESHOLD)
    .sort((a, b) => a.pct - b.pct)
    .map((u) => u.unit);
}

// --- 結果のテキスト書き出し（保護者が記録・共有するため） --------
function buildResultText() {
  if (!currentResultView) return "";
  const { subject, record } = currentResultView;
  const units = Object.entries(record.byUnit)
    .map(([unit, c]) => ({ unit, correct: c.correct, total: c.total, pct: c.total ? c.correct / c.total : 0 }))
    .sort((a, b) => a.pct - b.pct);
  const askedUnits = record.units || Object.keys(record.byUnit);
  const lines = [
    `【がくりょくしんだん】${SUBJECTS[subject].label}　${record.date}`,
    `スコア: ${record.correct}/${record.total}`,
    `出題範囲: ${askedUnits.length}/${unitsOf(subject).length}単元（${askedUnits.join("・")}）`,
  ];
  if (units.length && units[0].pct < WEAK_THRESHOLD) {
    lines.push(`最優先で対策すべき単元: ${units[0].unit}（${Math.round(units[0].pct * 100)}%）`);
  } else {
    lines.push("大きな苦手単元は見つかりませんでした");
  }
  lines.push("単元別:");
  units.forEach((u) => {
    const mark = u.pct < WEAK_THRESHOLD ? " ←にがて" : "";
    lines.push(`- ${u.unit}: ${u.correct}/${u.total}（${Math.round(u.pct * 100)}%）${mark}`);
  });
  return lines.join("\n");
}

/**
 * 全受験履歴を1つのMarkdownにまとめる。
 * 人が読める表＋末尾に機械可読のJSONを入れ、記録・バックアップ・復元の
 * どれにも使えるようにしている（スクショだと転記ミスが起きるため）
 */
function buildExportMarkdown() {
  const lines = [`# がくりょくしんだん 受験記録（書き出し日: ${todayStr()}）`, ""];

  Object.keys(SUBJECTS).forEach((subject) => {
    const list = store.history[subject] || [];
    lines.push(`## ${SUBJECTS[subject].label}`, "");
    if (list.length === 0) {
      lines.push("受験記録なし", "");
      return;
    }
    list.forEach((record, i) => {
      const askedUnits = record.units || Object.keys(record.byUnit);
      const units = Object.entries(record.byUnit)
        .map(([unit, c]) => ({ unit, correct: c.correct, total: c.total, pct: c.total ? c.correct / c.total : 0 }))
        .sort((a, b) => a.pct - b.pct);
      lines.push(`### ${i + 1}回目: ${record.date}（${record.correct}/${record.total}）`, "");
      lines.push(`- 出題範囲: ${askedUnits.length}/${unitsOf(subject).length}単元（${askedUnits.join("・")}）`);
      if (units.length && units[0].pct < WEAK_THRESHOLD) {
        lines.push(`- 最優先で対策すべき単元: **${units[0].unit}**（${Math.round(units[0].pct * 100)}%）`);
      } else {
        lines.push("- 大きな苦手単元は見つかりませんでした");
      }
      lines.push("", "| 単元 | 正答 | 正答率 | 判定 |", "|---|---|---|---|");
      units.forEach((u) => {
        const mark = u.pct < WEAK_THRESHOLD ? "にがて" : "OK";
        lines.push(`| ${u.unit} | ${u.correct}/${u.total} | ${Math.round(u.pct * 100)}% | ${mark} |`);
      });
      if (record.wrongs && record.wrongs.length) {
        lines.push("", "**まちがえた問題**", "", "| 単元 | 問題 | 正解 | 答えたもの |", "|---|---|---|---|");
        record.wrongs.forEach((w) => {
          lines.push(`| ${w.unit} | ${w.question} | ${w.answer} | ${w.chosen || "-"} |`);
        });
      }
      lines.push("");
    });
  });

  lines.push("---", "", "<!-- 機械可読データ（復元用） -->", "```json", JSON.stringify(store), "```", "");
  return lines.join("\n");
}

/** ダウンロード（共有シートが使えない環境のフォールバック） */
function downloadTextFile(text, filename) {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** 全履歴をファイル化し、iOSの共有シート（AirDrop等）で渡す */
async function shareResultFile() {
  const status = document.getElementById("copy-status");
  const text = buildExportMarkdown();
  const filename = `gakuryoku_shindan_${todayStr()}.md`;
  const file = new File([text], filename, { type: "text/plain" });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: "がくりょくしんだん 受験記録" });
      return;
    } catch (e) {
      if (e && e.name === "AbortError") return; // ユーザーが共有をキャンセルしただけ
      console.warn("共有に失敗。ダウンロードに切り替えます", e);
    }
  }
  downloadTextFile(text, filename);
  status.textContent = `「${filename}」を保存しました（ファイルAppを確認してください）。`;
  status.classList.remove("hidden");
}

/** クリップボードへコピー。失敗時は手動コピー用のテキスト欄を出す */
function copyResult() {
  const text = buildResultText();
  if (!text) return;
  const status = document.getElementById("copy-status");
  const fallback = document.getElementById("copy-fallback");

  const showFallback = () => {
    fallback.value = text;
    fallback.classList.remove("hidden");
    fallback.focus();
    fallback.select();
    status.textContent = "自動コピーできませんでした。下の文章を長押しでコピーしてください。";
    status.classList.remove("hidden");
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        status.textContent = "コピーしました！メモやLINEに貼り付けられます。";
        status.classList.remove("hidden");
        fallback.classList.add("hidden");
      })
      .catch(showFallback);
  } else {
    showFallback();
  }
}

// ============================================================
// イベント結線・初期化
// ============================================================
function bindEvents() {
  document.getElementById("btn-start-sansu").addEventListener("click", () => openScope("sansu"));
  document.getElementById("btn-start-shakai").addEventListener("click", () => openScope("shakai"));
  document.getElementById("btn-scope-start").addEventListener("click", startFromScope);
  document.getElementById("btn-scope-back").addEventListener("click", renderHome);
  document.getElementById("btn-scope-all").addEventListener("click", () => toggleAllScope(true));
  document.getElementById("btn-scope-none").addEventListener("click", () => toggleAllScope(false));
  document.getElementById("btn-quiz-quit").addEventListener("click", quitQuiz);
  document.getElementById("btn-quiz-next").addEventListener("click", nextQuestion);
  document.getElementById("btn-result-home").addEventListener("click", renderHome);
  document.getElementById("btn-open-history").addEventListener("click", renderHistory);
  document.getElementById("btn-history-home").addEventListener("click", renderHome);
  document.getElementById("btn-copy-result").addEventListener("click", copyResult);
  document.getElementById("btn-share-result").addEventListener("click", shareResultFile);
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
