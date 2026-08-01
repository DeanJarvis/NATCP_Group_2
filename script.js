const zodiacSigns = [
  ["♈", "牡羊座", "3/21–4/19"], ["♉", "金牛座", "4/20–5/20"], ["♊", "雙子座", "5/21–6/20"],
  ["♋", "巨蟹座", "6/21–7/22"], ["♌", "獅子座", "7/23–8/22"], ["♍", "處女座", "8/23–9/22"],
  ["♎", "天秤座", "9/23–10/22"], ["♏", "天蠍座", "10/23–11/21"], ["♐", "射手座", "11/22–12/21"],
  ["♑", "摩羯座", "12/22–1/19"], ["♒", "水瓶座", "1/20–2/18"], ["♓", "雙魚座", "2/19–3/20"]
];

const questions = [
  { key: "social", title: "今天，你比較想如何與世界相處？", hint: "選擇較貼近此刻的狀態。", answers: ["主動靠近，分享我的感受", "保留空間，安靜陪伴自己"] },
  { key: "decision", title: "面對今天的選擇，你傾向？", hint: "沒有標準答案，跟著直覺選。", answers: ["先跨出一步，再慢慢調整", "先看清方向，再做出決定"] },
  { key: "energy", title: "今天的能量，更像哪一種光？", hint: "選出最接近身體感受的一項。", answers: ["明亮而流動，想把握當下", "柔和而緩慢，需要好好充電"] }
];

const fortunes = ["大凶", "凶", "小凶", "末吉", "吉", "小吉", "中吉", "大吉"];
const fragments = {
  opening: {
    "牡羊座": "勇敢的牡羊，今天的星光提醒你，速度之外也藏著細微的答案。",
    "金牛座": "沉穩的金牛，今天值得相信那些讓你感到踏實的選擇。",
    "雙子座": "靈巧的雙子，散落的念頭正在悄悄連成一條路。",
    "巨蟹座": "溫柔的巨蟹，你細膩的感受並不是負擔，而是方向。",
    "獅子座": "閃耀的獅子，今天不必用力證明，真誠本身就有光。",
    "處女座": "細心的處女，允許今天留下一點不完美的空白。",
    "天秤座": "優雅的天秤，真正的平衡也包含對自己的偏愛。",
    "天蠍座": "深刻的天蠍，你已看見表面之下真正重要的事。",
    "射手座": "自由的射手，今天的遠方也可以是一個嶄新的念頭。",
    "摩羯座": "堅定的摩羯，你累積的每一步都比想像中更有重量。",
    "水瓶座": "獨特的水瓶，別急著讓所有人理解你的節奏。",
    "雙魚座": "浪漫的雙魚，你的直覺正輕輕指向需要被照顧的地方。"
  },
  social: ["今天適合把心裡的話交給值得信任的人，一次真誠的靠近會帶來回音。", "保留一點安靜不是退縮；先照顧好內在，關係自然會找到舒服的距離。"],
  decision: ["想做的事可以先從最小的一步開始，行動會替你照亮下一段路。", "暫時不決定也是一種決定，讓資訊沉澱後，你會更清楚真正想守住什麼。"],
  energy: ["把充沛的能量留給真正重要的事，專注會讓今天變得明亮。", "請把步調放慢，休息並不會使你落後，而是在替明天儲存力量。"],
  fortune: {
    "大凶": "籤運雖低，卻適合避開勉強與衝動；今天以守代攻，就是最好的轉運。",
    "凶": "遇到阻力時先停一下，少做一個倉促決定，就多保留一份餘裕。",
    "小凶": "小小的不順只是提醒，調整順序後仍能安穩前進。",
    "末吉": "好事正在路上但尚未抵達，今天適合耐心完成眼前的小事。",
    "吉": "穩定的好運陪著你，真誠回應眼前的人與事即可。",
    "小吉": "一個微小的驚喜可能出現，記得為偶然留一點空間。",
    "中吉": "今天的努力容易得到回應，適合推進重要但不必完美的事。",
    "大吉": "星光正盛，勇敢接受善意，也把你的光分享給身邊的人。"
  },
  closing: "不必一次想清所有答案。今天，只要忠於此刻的自己，就已經足夠。"
};

const freshState = () => ({ zodiac: null, answers: Array(3).fill(null), questionIndex: 0, mood: "", fortune: null, letter: "", generating: false });
let state = freshState();
const $ = (selector) => document.querySelector(selector);
const screens = [...document.querySelectorAll(".screen")];

function showScreen(id) {
  screens.forEach((screen) => screen.classList.toggle("is-active", screen.id === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
  requestAnimationFrame(() => $(`#${id} h1, #${id} h2`)?.focus({ preventScroll: true }));
}

function buildZodiacGrid() {
  $("#zodiac-grid").replaceChildren(...zodiacSigns.map(([symbol, name, date]) => {
    const button = document.createElement("button");
    button.className = "zodiac-option";
    button.type = "button";
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", "false");
    button.dataset.name = name;
    button.innerHTML = `<span class="symbol" aria-hidden="true">${symbol}</span>${name}<small>${date}</small>`;
    return button;
  }));
}

function selectZodiac(button) {
  state.zodiac = button.dataset.name;
  document.querySelectorAll(".zodiac-option").forEach((item) => {
    const selected = item === button;
    item.classList.toggle("is-selected", selected);
    item.setAttribute("aria-checked", String(selected));
  });
  $("#zodiac-next").disabled = false;
}

function renderQuestion() {
  const index = state.questionIndex;
  const question = questions[index];
  $("#question-panel").classList.remove("question-enter");
  void $("#question-panel").offsetWidth;
  $("#question-panel").classList.add("question-enter");
  $("#question-title").textContent = question.title;
  $("#question-hint").textContent = question.hint;
  $("#progress-label").textContent = `${index + 1} / 3`;
  $("#progress-bar").style.width = `${((index + 1) / 3) * 100}%`;
  $("#quiz-back").textContent = index === 0 ? "← 返回星座" : "← 上一題";
  $("#quiz-next").innerHTML = index === 2 ? "完成問答 <span>→</span>" : "下一題 <span>→</span>";
  $("#quiz-next").disabled = state.answers[index] === null;
  $("#answer-list").replaceChildren(...question.answers.map((answer, answerIndex) => {
    const button = document.createElement("button");
    const selected = state.answers[index] === answerIndex;
    button.className = `answer-option${selected ? " is-selected" : ""}`;
    button.type = "button";
    button.dataset.index = String(answerIndex);
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", String(selected));
    const dot = document.createElement("span");
    dot.className = "answer-dot";
    dot.setAttribute("aria-hidden", "true");
    button.append(dot, document.createTextNode(answer));
    return button;
  }));
}

function generateLetter() {
  const safe = (value, fallback) => value ?? fallback;
  return [safe(fragments.opening[state.zodiac], "今天的星光正安靜地陪著你。"), safe(fragments.social[state.answers[0]], "照顧好自己的界線。"), safe(fragments.decision[state.answers[1]], "相信你會找到適合的步調。"), safe(fragments.energy[state.answers[2]], "把能量留給重要的事。"), safe(fragments.fortune[state.fortune], "讓今天自然展開。"), fragments.closing].join("\n\n");
}

function renderResult() {
  $("#fortune-output").textContent = state.fortune;
  $("#letter-output").replaceChildren(...state.letter.split("\n\n").map((text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    return paragraph;
  }));
  $("#mood-output").textContent = state.mood.trim() || "今天選擇留白。";
  $("#share-status").textContent = "";
}

function submitMood() {
  if (state.generating) return;
  state.generating = true;
  $("#mood-submit").disabled = true;
  state.mood = $("#mood-input").value;
  state.fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  state.letter = generateLetter();
  showScreen("loading-screen");
  window.setTimeout(() => { renderResult(); state.generating = false; $("#mood-submit").disabled = false; showScreen("result-screen"); }, 900);
}

function shareText() {
  return `HoroscopeToday｜今日籤運：${state.fortune}\n\n${state.letter}\n\n今天的心情：${state.mood.trim() || "留白"}`;
}

async function shareResult() {
  const data = { title: "HoroscopeToday 今日星語", text: shareText() };
  try {
    if (navigator.share) await navigator.share(data);
    else if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(data.text); $("#share-status").textContent = "已複製今日星語。"; }
    else throw new Error("clipboard unavailable");
  } catch (error) {
    if (error.name === "AbortError") return;
    const textarea = document.createElement("textarea");
    textarea.value = data.text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    $("#share-status").textContent = copied ? "已複製今日星語。" : "複製失敗，請手動選取信箋內容。";
  }
}

function resetApp() {
  state = freshState();
  $("#mood-input").value = "";
  $("#char-count").textContent = "0";
  $("#zodiac-next").disabled = true;
  $("#mood-submit").disabled = false;
  $("#fortune-output").textContent = "";
  $("#letter-output").replaceChildren();
  $("#mood-output").textContent = "";
  document.querySelectorAll(".zodiac-option").forEach((item) => { item.classList.remove("is-selected"); item.setAttribute("aria-checked", "false"); });
  showScreen("home-screen");
}

$("#start-button").addEventListener("click", () => showScreen("zodiac-screen"));
$("#zodiac-grid").addEventListener("click", (event) => { const button = event.target.closest(".zodiac-option"); if (button) selectZodiac(button); });
$("#zodiac-next").addEventListener("click", () => { if (!state.zodiac) return; state.questionIndex = 0; renderQuestion(); showScreen("quiz-screen"); });
$("#answer-list").addEventListener("click", (event) => { const button = event.target.closest(".answer-option"); if (!button) return; state.answers[state.questionIndex] = Number(button.dataset.index); renderQuestion(); });
$("#quiz-next").addEventListener("click", () => { if (state.answers[state.questionIndex] === null) return; if (state.questionIndex < 2) { state.questionIndex += 1; renderQuestion(); } else { $("#mood-input").value = state.mood; showScreen("mood-screen"); } });
$("#quiz-back").addEventListener("click", () => { if (state.questionIndex === 0) showScreen("zodiac-screen"); else { state.questionIndex -= 1; renderQuestion(); } });
$("#mood-input").addEventListener("input", (event) => { state.mood = event.target.value; $("#char-count").textContent = String(event.target.value.length); });
$("#mood-back").addEventListener("click", () => { if (state.generating) return; state.questionIndex = 2; renderQuestion(); showScreen("quiz-screen"); });
$("#mood-submit").addEventListener("click", submitMood);
$("#share-button").addEventListener("click", shareResult);
$("#restart-button").addEventListener("click", resetApp);

buildZodiacGrid();
