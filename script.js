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

const fortuneWeights = [
  ["大凶", 3], ["凶", 10], ["末吉", 17], ["吉", 28],
  ["小吉", 20], ["中吉", 15], ["大吉", 7]
];
const fragments = {
  opening: {
    "牡羊座": ["牡羊座的你，今天的星光提醒你，速度之外也藏著細微的答案。", "牡羊座的你，今天適合把勇氣放在真正重要的一步上。"],
    "金牛座": ["金牛座的你，今天值得相信那些讓你感到踏實的選擇。", "金牛座的你，穩穩前進也能抵達想去的地方。"],
    "雙子座": ["雙子座的你，散落的念頭正在悄悄連成一條路。", "雙子座的你，今天的好奇心會替你打開新的角度。"],
    "巨蟹座": ["巨蟹座的你，細膩的感受並不是負擔，而是方向。", "巨蟹座的你，先照顧心裡的需要，再回應外面的聲音。"],
    "獅子座": ["獅子座的你，今天不必用力證明，真誠本身就有光。", "獅子座的你，溫柔地相信自己，也能照亮身邊的人。"],
    "處女座": ["處女座的你，允許今天留下一點不完美的空白。", "處女座的你，整理好最重要的一件事就已經足夠。"],
    "天秤座": ["天秤座的你，真正的平衡也包含對自己的偏愛。", "天秤座的你，今天可以先聽見自己，再照顧每個人的期待。"],
    "天蠍座": ["天蠍座的你，已看見表面之下真正重要的事。", "天蠍座的你，相信深處的直覺，但不必急著說出答案。"],
    "射手座": ["射手座的你，今天的遠方也可以是一個嶄新的念頭。", "射手座的你，把自由留給探索，也替自己留一個落腳處。"],
    "摩羯座": ["摩羯座的你，累積的每一步都比想像中更有重量。", "摩羯座的你，今天的穩定會讓長期努力慢慢發光。"],
    "水瓶座": ["水瓶座的你，別急著讓所有人理解你的節奏。", "水瓶座的你，獨特的想法值得先被自己好好接住。"],
    "雙魚座": ["雙魚座的你，直覺正輕輕指向需要被照顧的地方。", "雙魚座的你，柔軟不是脆弱，而是今天理解世界的方法。"]
  },
  social: ["今天適合把心裡的話交給值得信任的人，一次真誠的靠近會帶來回音。", "保留一點安靜不是退縮；先照顧好內在，關係自然會找到舒服的距離。"],
  decision: ["想做的事可以先從最小的一步開始，行動會替你照亮下一段路。", "暫時不決定也是一種決定，讓資訊沉澱後，你會更清楚真正想守住什麼。"],
  energy: ["把充沛的能量留給真正重要的事，專注會讓今天變得明亮。", "請把步調放慢，休息並不會使你落後，而是在替明天儲存力量。"],
  fortune: {
    "大凶": "籤運雖低，卻適合避開勉強與衝動；今天以守代攻，就是最好的轉運。",
    "凶": "遇到阻力時先停一下，少做一個倉促決定，就多保留一份餘裕。",
    "末吉": "好事正在路上但尚未抵達，今天適合耐心完成眼前的小事。",
    "吉": "穩定的好運陪著你，真誠回應眼前的人與事即可。",
    "小吉": "一個微小的驚喜可能出現，記得為偶然留一點空間。",
    "中吉": "今天的努力容易得到回應，適合推進重要但不必完美的事。",
    "大吉": "星光正盛，勇敢接受善意，也把你的光分享給身邊的人。"
  },
  closing: "不必一次想清所有答案。今天，只要忠於此刻的自己，就已經足夠。"
};

const freshState = () => ({ zodiac: null, answers: Array(3).fill(null), questionIndex: 0, mood: "", fortune: null, letter: "", generating: false, transitioning: false });
let state = freshState();
const $ = (selector) => document.querySelector(selector);
const screens = [...document.querySelectorAll(".screen")];

function showScreen(id) {
  screens.forEach((screen) => screen.classList.toggle("is-active", screen.id === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
  requestAnimationFrame(() => $(`#${id} h1, #${id} h2`)?.focus({ preventScroll: true }));
}

function buildZodiacGrid() {
  $("#zodiac-grid").replaceChildren(...zodiacSigns.map(([symbol, name, date], index) => {
    const button = document.createElement("button");
    button.className = "zodiac-option";
    button.type = "button";
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", "false");
    button.dataset.name = name;
    button.style.setProperty("--zodiac-angle", `${index * 30}deg`);
    button.innerHTML = `<span class="symbol" aria-hidden="true">${symbol}</span>${name}<small>${date}</small>`;
    button.addEventListener("click", () => selectZodiac(button));
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

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function changeQuestion(nextIndex) {
  if (state.transitioning) return;
  state.transitioning = true;
  const panel = $("#question-panel");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  panel.classList.add("question-exit");
  window.setTimeout(() => {
    state.questionIndex = nextIndex;
    panel.classList.remove("question-exit");
    renderQuestion();
    state.transitioning = false;
  }, reducedMotion ? 0 : 140);
}

function drawFortune() {
  const roll = Math.random() * fortuneWeights.reduce((sum, [, weight]) => sum + weight, 0);
  let cursor = 0;
  for (const [fortune, weight] of fortuneWeights) {
    cursor += weight;
    if (roll < cursor) return fortune;
  }
  return "吉";
}

function generateLetter() {
  const safe = (value, fallback) => value ?? fallback;
  const openings = fragments.opening[state.zodiac];
  return [Array.isArray(openings) ? pickRandom(openings) : "今天的星光正安靜地陪著你。", safe(fragments.social[state.answers[0]], "照顧好自己的界線。"), safe(fragments.decision[state.answers[1]], "相信你會找到適合的步調。"), safe(fragments.energy[state.answers[2]], "把能量留給重要的事。"), safe(fragments.fortune[state.fortune], "讓今天自然展開。"), fragments.closing].join("\n\n");
}

function renderResult() {
  $("#fortune-output").textContent = state.fortune;
  $("#letter-output").replaceChildren(...state.letter.split("\n\n").map((text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    return paragraph;
  }));
  $("#mood-output").textContent = state.mood.trim() || "今天選擇留白。";
  $("#card-date").textContent = formatToday();
  $("#share-status").textContent = "";
}

function formatToday() {
  return new Intl.DateTimeFormat("zh-TW", { year: "numeric", month: "long", day: "numeric", weekday: "long" }).format(new Date());
}

async function requestApiLetter() {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        zodiac: state.zodiac,
        answers: { social: state.answers[0], decision: state.answers[1], energy: state.answers[2] },
        fortune: state.fortune,
        mood: state.mood
      })
    });
    if (!response.ok) throw new Error("API request failed");
    const result = await response.json();
    if (![result.title, result.letter, result.closing].every((value) => typeof value === "string" && value.trim())) throw new Error("Invalid API response");
    state.letter = `${result.title.trim()}\n\n${result.letter.trim()}\n\n${result.closing.trim()}`;
    $("#generation-source").textContent = "此封信箋由 AI 為你生成。";
  } finally {
    window.clearTimeout(timeout);
  }
}

async function submitMood() {
  if (state.generating) return;
  state.generating = true;
  $("#mood-submit").disabled = true;
  state.mood = $("#mood-input").value;
  state.fortune = drawFortune();
  state.letter = generateLetter();
  showScreen("loading-screen");
  $("#generation-source").textContent = "";
  try {
    await requestApiLetter();
  } catch {
    $("#generation-source").textContent = "AI 暫時沒有回應，已為你使用星光備援信箋。";
  } finally {
    renderResult();
    state.generating = false;
    $("#mood-submit").disabled = false;
    showScreen("result-screen");
  }
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

async function copyShareText() {
  try {
    await navigator.clipboard.writeText(shareText());
    $("#share-status").textContent = "已複製今日星語。";
  } catch {
    await shareResult();
  }
}

function shareToPlatform(platform) {
  const text = shareText();
  const pageUrl = window.location.href;
  const encodedText = encodeURIComponent(`${text}\n\n${pageUrl}`);
  const encodedUrl = encodeURIComponent(pageUrl);
  const urls = {
    line: `https://line.me/R/msg/text/?${encodedText}`,
    whatsapp: `https://wa.me/?text=${encodedText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    x: `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodedUrl}`
  };
  if (platform === "copy") return copyShareText();
  if (platform === "instagram") return shareResult();
  if (urls[platform]) window.open(urls[platform], "_blank", "noopener,noreferrer");
}

async function saveResultImage() {
  if (typeof window.html2canvas !== "function") {
    $("#share-status").textContent = "圖片工具尚未載入，請稍後再試。";
    return;
  }
  const button = $("#save-image");
  button.disabled = true;
  $("#share-status").textContent = "正在製作圖片…";
  try {
    const resultCard = $("#result-card");
    if (document.fonts?.ready) await document.fonts.ready;
    const canvas = await window.html2canvas(resultCard, {
      scale: 2,
      backgroundColor: null,
      useCORS: true,
      logging: false,
      width: resultCard.scrollWidth,
      height: resultCard.scrollHeight,
      windowWidth: Math.max(document.documentElement.clientWidth, resultCard.scrollWidth),
      windowHeight: Math.max(document.documentElement.clientHeight, resultCard.scrollHeight),
      onclone(clonedDocument) {
        clonedDocument.body.classList.remove("theme-fade");
        clonedDocument.querySelector("#result-card")?.classList.add("export-capture");
      }
    });
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) throw new Error("image failed");
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `HoroscopeToday-${new Date().toISOString().slice(0, 10)}.png`;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    $("#share-status").textContent = "今日星語圖片已儲存。";
  } catch {
    $("#share-status").textContent = "圖片儲存失敗，請稍後再試。";
  } finally {
    button.disabled = false;
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
  $("#generation-source").textContent = "";
  document.querySelectorAll(".zodiac-option").forEach((item) => { item.classList.remove("is-selected"); item.setAttribute("aria-checked", "false"); });
  showScreen("home-screen");
}

$("#start-button").addEventListener("click", () => showScreen("zodiac-screen"));
$("#zodiac-next").addEventListener("click", () => { if (!state.zodiac) return; state.questionIndex = 0; renderQuestion(); showScreen("quiz-screen"); });
$("#answer-list").addEventListener("click", (event) => { const button = event.target.closest(".answer-option"); if (!button) return; state.answers[state.questionIndex] = Number(button.dataset.index); renderQuestion(); });
$("#quiz-next").addEventListener("click", () => { if (state.transitioning || state.answers[state.questionIndex] === null) return; if (state.questionIndex < 2) changeQuestion(state.questionIndex + 1); else { $("#mood-input").value = state.mood; showScreen("mood-screen"); } });
$("#quiz-back").addEventListener("click", () => { if (state.transitioning) return; if (state.questionIndex === 0) showScreen("zodiac-screen"); else changeQuestion(state.questionIndex - 1); });
$("#mood-input").addEventListener("input", (event) => { state.mood = event.target.value; $("#char-count").textContent = String(event.target.value.length); });
$("#mood-back").addEventListener("click", () => { if (state.generating) return; state.questionIndex = 2; renderQuestion(); showScreen("quiz-screen"); });
$("#mood-submit").addEventListener("click", submitMood);
$("#share-button").addEventListener("click", () => {
  const menu = $("#share-menu");
  menu.hidden = !menu.hidden;
  $("#share-button").setAttribute("aria-expanded", String(!menu.hidden));
});
$("#share-menu").addEventListener("click", (event) => {
  const button = event.target.closest("[data-share]");
  if (!button) return;
  shareToPlatform(button.dataset.share);
  $("#share-menu").hidden = true;
  $("#share-button").setAttribute("aria-expanded", "false");
});
$("#save-image").addEventListener("click", saveResultImage);
$("#card-bg-toggle").addEventListener("click", () => {
  const menu = $("#card-bg-menu");
  menu.hidden = !menu.hidden;
  $("#card-bg-toggle").setAttribute("aria-expanded", String(!menu.hidden));
});
$("#card-bg-menu").addEventListener("click", (event) => {
  const button = event.target.closest("[data-background]");
  if (!button) return;
  $("#result-card").dataset.background = button.dataset.background;
  document.querySelectorAll(".card-bg-option").forEach((option) => {
    const selected = option === button;
    option.classList.toggle("is-selected", selected);
    option.setAttribute("aria-pressed", String(selected));
  });
  $("#card-bg-menu").hidden = true;
  $("#card-bg-toggle").setAttribute("aria-expanded", "false");
});
$("#restart-button").addEventListener("click", resetApp);

buildZodiacGrid();
$("#date-display").textContent = formatToday();

/* ---------- Donate modal (amount + name) ---------- */

const donateModal = $("#donate-modal");
const donateFormStep = $("#donate-form-step");
const donateCardStep = $("#donate-card-step");
const donateSuccessStep = $("#donate-success-step");
const amountButtons = [...document.querySelectorAll(".amount-button")];
const donateStepDots = [...document.querySelectorAll(".donate-step-dot")];
let selectedDonateAmount = null;
let pendingDonation = null; // { name, amount, message }
let paying = false;

function setDonateModal(open) {
  donateModal.hidden = !open;
  document.body.classList.toggle("modal-open", open);
  if (open) $("#close-donate").focus();
}

function setDonateStep(stepNumber) {
  donateStepDots.forEach((dot) => dot.classList.toggle("is-active", Number(dot.dataset.step) <= stepNumber));
}

function resetDonateDemo() {
  $("#donate-form").reset();
  $("#card-form").reset();
  selectedDonateAmount = null;
  pendingDonation = null;
  paying = false;
  amountButtons.forEach((button) => {
    button.classList.remove("is-selected");
    button.setAttribute("aria-pressed", "false");
  });
  $("#donate-error").textContent = "";
  $("#card-error").textContent = "";
  $("#pay-now-button").classList.remove("is-loading");
  $("#pay-now-button").disabled = false;
  donateFormStep.hidden = false;
  donateCardStep.hidden = true;
  donateSuccessStep.hidden = true;
  setDonateStep(1);
  updateCardPreview();
}

function fireConfetti() {
  const canvas = $("#confetti-canvas");
  const context = canvas.getContext("2d");
  const card = canvas.parentElement;
  canvas.width = card.clientWidth;
  canvas.height = card.clientHeight;
  const colors = ["#7668a6", "#d9a06c", "#f0c987", "#b7a8dc"];
  const pieces = Array.from({ length: 50 }, () => ({ x: Math.random() * canvas.width, y: -10, size: Math.random() * 5 + 3, speed: Math.random() * 2.5 + 1.5, drift: Math.random() * 1.5 - .75, color: colors[Math.floor(Math.random() * colors.length)] }));
  let frame = 0;
  function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((piece) => { piece.y += piece.speed; piece.x += piece.drift; context.fillStyle = piece.color; context.fillRect(piece.x, piece.y, piece.size, piece.size); });
    frame += 1;
    if (frame < 80) requestAnimationFrame(animate);
    else context.clearRect(0, 0, canvas.width, canvas.height);
  }
  animate();
}

$("#open-donate").addEventListener("click", () => { resetDonateDemo(); setDonateModal(true); });
$("#close-donate").addEventListener("click", () => setDonateModal(false));
$("#finish-donate").addEventListener("click", () => setDonateModal(false));
donateModal.addEventListener("click", (event) => { if (event.target === donateModal) setDonateModal(false); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !donateModal.hidden) setDonateModal(false); });

amountButtons.forEach((button) => button.addEventListener("click", () => {
  selectedDonateAmount = Number(button.dataset.amount);
  $("#custom-amount").value = "";
  amountButtons.forEach((item) => {
    const selected = item === button;
    item.classList.toggle("is-selected", selected);
    item.setAttribute("aria-pressed", String(selected));
  });
}));

$("#custom-amount").addEventListener("input", () => {
  selectedDonateAmount = null;
  amountButtons.forEach((button) => { button.classList.remove("is-selected"); button.setAttribute("aria-pressed", "false"); });
});

$("#donate-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = $("#supporter-name").value.trim();
  const customAmount = Number($("#custom-amount").value);
  const amount = selectedDonateAmount || customAmount;
  if (!name || !Number.isFinite(amount) || amount < 1 || amount > 100000) {
    $("#donate-error").textContent = "請填寫名字，並選擇有效的贊助金額。";
    return;
  }
  $("#donate-error").textContent = "";
  pendingDonation = { name, amount, message: $("#donate-message").value.trim() };

  const paymentEndpoint = window.location.protocol === "file:" ? "http://localhost:3000/pay" : "/pay";
  const paymentForm = document.createElement("form");
  paymentForm.method = "POST";
  paymentForm.action = paymentEndpoint;
  const amountInput = document.createElement("input");
  amountInput.type = "hidden";
  amountInput.name = "amount";
  amountInput.value = String(amount);
  paymentForm.append(amountInput);
  document.body.append(paymentForm);
  paymentForm.submit();
});

/* ---------- Mock credit card payment ---------- */

function detectCardBrand(digits) {
  if (/^4/.test(digits)) return "VISA";
  if (/^(5[1-5]|2[2-7])/.test(digits)) return "Mastercard";
  if (/^3[47]/.test(digits)) return "AMEX";
  if (/^6(011|5)/.test(digits)) return "Discover";
  return "CARD";
}

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function formatCvc(value) {
  return value.replace(/\D/g, "").slice(0, 4);
}

function updateCardPreview() {
  const digits = $("#card-number").value.replace(/\D/g, "");
  const groups = digits.padEnd(16, "•").match(/.{1,4}/g) || ["••••", "••••", "••••", "••••"];
  const maskedGroups = groups.map((group, index) => {
    const typedInGroup = digits.slice(index * 4, index * 4 + 4);
    return typedInGroup.length === 4 ? typedInGroup : (typedInGroup + "•".repeat(4 - typedInGroup.length));
  });
  $("#cc-number-display").textContent = maskedGroups.join(" ");
  $("#cc-brand").textContent = digits ? detectCardBrand(digits) : "CARD";

  const name = $("#card-name").value.trim();
  $("#cc-name-display").textContent = name ? name.toUpperCase() : "YOUR NAME";

  const expiry = $("#card-expiry").value.trim();
  $("#cc-expiry-display").textContent = expiry || "MM/YY";
}

function isExpiryValid(value) {
  const match = /^(\d{2})\/(\d{2})$/.exec(value);
  if (!match) return false;
  const month = Number(match[1]);
  if (month < 1 || month > 12) return false;
  const year = 2000 + Number(match[2]);
  const now = new Date();
  const expiryDate = new Date(year, month, 0, 23, 59, 59);
  return expiryDate >= new Date(now.getFullYear(), now.getMonth(), 1);
}

$("#card-number").addEventListener("input", (event) => {
  event.target.value = formatCardNumber(event.target.value);
  updateCardPreview();
});
$("#card-name").addEventListener("input", updateCardPreview);
$("#card-expiry").addEventListener("input", (event) => {
  event.target.value = formatExpiry(event.target.value);
  updateCardPreview();
});
$("#card-cvc").addEventListener("input", (event) => {
  event.target.value = formatCvc(event.target.value);
});

$("#card-back").addEventListener("click", () => {
  if (paying) return;
  donateCardStep.hidden = true;
  donateFormStep.hidden = false;
  setDonateStep(1);
});

$("#card-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  if (paying || !pendingDonation) return;

  const cardDigits = $("#card-number").value.replace(/\D/g, "");
  const name = $("#card-name").value.trim();
  const expiry = $("#card-expiry").value.trim();
  const cvc = $("#card-cvc").value.trim();

  if (cardDigits.length !== 16 || !name || !isExpiryValid(expiry) || cvc.length < 3) {
    $("#card-error").textContent = "請確認卡號、姓名、有效期限與安全碼皆正確填寫。";
    return;
  }
  $("#card-error").textContent = "";

  paying = true;
  const payButton = $("#pay-now-button");
  payButton.disabled = true;
  payButton.classList.add("is-loading");

  // Mock payment processing delay.
  await new Promise((resolve) => window.setTimeout(resolve, 1500));

  payButton.classList.remove("is-loading");
  payButton.disabled = false;
  paying = false;

  $("#success-name").textContent = pendingDonation.name;
  $("#success-amount").textContent = `NT$${pendingDonation.amount.toLocaleString("zh-TW")}`;
  donateCardStep.hidden = true;
  donateSuccessStep.hidden = false;
  setDonateStep(3);
  $("#finish-donate").focus();
  fireConfetti();
});

/* ---------- Theme ---------- */

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("theme-dark", isDark);
  $("#theme-toggle").setAttribute("aria-pressed", String(isDark));
  $("#theme-toggle").setAttribute("aria-label", isDark ? "切換為療癒亮色主題" : "切換為神秘深色主題");
  $(".theme-toggle-icon").textContent = isDark ? "☀" : "☾";
  try { localStorage.setItem("horoscope-theme", isDark ? "dark" : "light"); } catch {}
}

let savedTheme = "light";
try { savedTheme = localStorage.getItem("horoscope-theme") || "light"; } catch {}
applyTheme(savedTheme === "dark" ? "dark" : "light");

$("#theme-toggle").addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("theme-dark") ? "light" : "dark";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reducedMotion && typeof document.startViewTransition === "function") {
    document.startViewTransition(() => applyTheme(nextTheme));
    return;
  }
  applyTheme(nextTheme);
  if (!reducedMotion) {
    document.body.classList.remove("theme-fade");
    void document.body.offsetWidth;
    document.body.classList.add("theme-fade");
    window.setTimeout(() => document.body.classList.remove("theme-fade"), 420);
  }
});
