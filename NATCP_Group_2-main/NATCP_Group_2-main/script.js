const zodiacSigns = [
  { key: "aries", symbol: "♈", name: { zh: "牡羊座", en: "Aries" }, date: { zh: "3/21–4/19", en: "Mar 21–Apr 19" } },
  { key: "taurus", symbol: "♉", name: { zh: "金牛座", en: "Taurus" }, date: { zh: "4/20–5/20", en: "Apr 20–May 20" } },
  { key: "gemini", symbol: "♊", name: { zh: "雙子座", en: "Gemini" }, date: { zh: "5/21–6/20", en: "May 21–Jun 20" } },
  { key: "cancer", symbol: "♋", name: { zh: "巨蟹座", en: "Cancer" }, date: { zh: "6/21–7/22", en: "Jun 21–Jul 22" } },
  { key: "leo", symbol: "♌", name: { zh: "獅子座", en: "Leo" }, date: { zh: "7/23–8/22", en: "Jul 23–Aug 22" } },
  { key: "virgo", symbol: "♍", name: { zh: "處女座", en: "Virgo" }, date: { zh: "8/23–9/22", en: "Aug 23–Sep 22" } },
  { key: "libra", symbol: "♎", name: { zh: "天秤座", en: "Libra" }, date: { zh: "9/23–10/22", en: "Sep 23–Oct 22" } },
  { key: "scorpio", symbol: "♏", name: { zh: "天蠍座", en: "Scorpio" }, date: { zh: "10/23–11/21", en: "Oct 23–Nov 21" } },
  { key: "sagittarius", symbol: "♐", name: { zh: "射手座", en: "Sagittarius" }, date: { zh: "11/22–12/21", en: "Nov 22–Dec 21" } },
  { key: "capricorn", symbol: "♑", name: { zh: "摩羯座", en: "Capricorn" }, date: { zh: "12/22–1/19", en: "Dec 22–Jan 19" } },
  { key: "aquarius", symbol: "♒", name: { zh: "水瓶座", en: "Aquarius" }, date: { zh: "1/20–2/18", en: "Jan 20–Feb 18" } },
  { key: "pisces", symbol: "♓", name: { zh: "雙魚座", en: "Pisces" }, date: { zh: "2/19–3/20", en: "Feb 19–Mar 20" } }
];

const questions = [
  { key: "social", title: { zh: "今天，你比較想如何與世界相處？", en: "How would you like to relate to the world today?" }, hint: { zh: "選擇較貼近此刻的狀態。", en: "Choose the option that feels closest to you right now." }, answers: [{ zh: "主動靠近，分享我的感受", en: "Reach out and share how I feel" }, { zh: "保留空間，安靜陪伴自己", en: "Keep some space and stay quietly with myself" }] },
  { key: "decision", title: { zh: "面對今天的選擇，你傾向？", en: "Which way do you lean for today’s choices?" }, hint: { zh: "沒有標準答案，跟著直覺選。", en: "There’s no right answer—follow your intuition." }, answers: [{ zh: "先跨出一步，再慢慢調整", en: "Take the first step, then adjust as I go" }, { zh: "先看清方向，再做出決定", en: "Get clear on the direction before deciding" }] },
  { key: "energy", title: { zh: "今天的能量，更像哪一種光？", en: "What kind of light does your energy feel like today?" }, hint: { zh: "選出最接近身體感受的一項。", en: "Pick the one that feels closest to your body right now." }, answers: [{ zh: "明亮而流動，想把握當下", en: "Bright and flowing, ready to seize the moment" }, { zh: "柔和而緩慢，需要好好充電", en: "Gentle and slow, needing rest and recharge" }] }
];

const fortunes = { zh: ["大凶", "凶", "小凶", "末吉", "吉", "小吉", "中吉", "大吉"], en: ["Very Bad", "Bad", "Somewhat Bad", "Almost Good", "Good", "Slightly Good", "Very Good", "Excellent"] };
const fragments = {
  opening: {
    zh: {
      aries: "勇敢的牡羊，今天的星光提醒你，速度之外也藏著細微的答案。",
      taurus: "沉穩的金牛，今天值得相信那些讓你感到踏實的選擇。",
      gemini: "靈巧的雙子，散落的念頭正在悄悄連成一條路。",
      cancer: "溫柔的巨蟹，你細膩的感受並不是負擔，而是方向。",
      leo: "閃耀的獅子，今天不必用力證明，真誠本身就有光。",
      virgo: "細心的處女，允許今天留下一點不完美的空白。",
      libra: "優雅的天秤，真正的平衡也包含對自己的偏愛。",
      scorpio: "深刻的天蠍，你已看見表面之下真正重要的事。",
      sagittarius: "自由的射手，今天的遠方也可以是一個嶄新的念頭。",
      capricorn: "堅定的摩羯，你累積的每一步都比想像中更有重量。",
      aquarius: "獨特的水瓶，別急著讓所有人理解你的節奏。",
      pisces: "浪漫的雙魚，你的直覺正輕輕指向需要被照顧的地方。"
    },
    en: {
      aries: "Brave Aries, today’s stars remind you that there is still a subtle answer beneath the rush.",
      taurus: "Steady Taurus, today is a good day to trust the choices that make you feel grounded.",
      gemini: "Curious Gemini, scattered thoughts are quietly becoming a path.",
      cancer: "Gentle Cancer, your tenderness is not a burden but a direction.",
      leo: "Radiant Leo, you do not need to prove yourself today—your sincerity already shines.",
      virgo: "Thoughtful Virgo, allow a little imperfection to remain in the day.",
      libra: "Elegant Libra, true balance also includes a little kindness toward yourself.",
      scorpio: "Intense Scorpio, you already see what matters beneath the surface.",
      sagittarius: "Free Sagittarius, even the distance ahead can become a fresh idea.",
      capricorn: "Steady Capricorn, every step you have taken carries more weight than you think.",
      aquarius: "Unique Aquarius, do not rush to make everyone understand your rhythm.",
      pisces: "Romantic Pisces, your intuition is quietly pointing to what needs care."
    }
  },
  social: { zh: ["今天適合把心裡的話交給值得信任的人，一次真誠的靠近會帶來回音。", "保留一點安靜不是退縮；先照顧好內在，關係自然會找到舒服的距離。"], en: ["Today is a good day to share your truth with someone trustworthy—one sincere step closer can echo back.", "Keeping a little quiet is not withdrawal; it is caring for your inner world so the connection can feel natural."] },
  decision: { zh: ["想做的事可以先從最小的一步開始，行動會替你照亮下一段路。", "暫時不決定也是一種決定，讓資訊沉澱後，你會更清楚真正想守住什麼。"], en: ["You can begin with the smallest step; action will help light the next path.", "Waiting a moment before deciding is still a decision. Let things settle and you will know what truly matters."] },
  energy: { zh: ["把充沛的能量留給真正重要的事，專注會讓今天變得明亮。", "請把步調放慢，休息並不會使你落後，而是在替明天儲存力量。"], en: ["Save your energy for what truly matters; focus will make the day brighter.", "Slow your pace a little. Rest is not falling behind; it is storing strength for tomorrow."] },
  fortune: {
    zh: {
      大凶: "籤運雖低，卻適合避開勉強與衝動；今天以守代攻，就是最好的轉運。",
      凶: "遇到阻力時先停一下，少做一個倉促決定，就多保留一份餘裕。",
      小凶: "小小的不順只是提醒，調整順序後仍能安穩前進。",
      末吉: "好事正在路上但尚未抵達，今天適合耐心完成眼前的小事。",
      吉: "穩定的好運陪著你，真誠回應眼前的人與事即可。",
      小吉: "一個微小的驚喜可能出現，記得為偶然留一點空間。",
      中吉: "今天的努力容易得到回應，適合推進重要但不必完美的事。",
      大吉: "星光正盛，勇敢接受善意，也把你的光分享給身邊的人。"
    },
    en: {
      "Very Bad": "The fortune is low, so it is best to avoid forcing things today. Protect your energy and keep your pace steady.",
      Bad: "When resistance appears, pause for a moment. One less impulsive decision will preserve more space for calm.",
      "Somewhat Bad": "A small setback is only a reminder. Adjust your order and you can still move forward steadily.",
      "Almost Good": "Good things are near, but not quite here yet. Today is a good day to finish small tasks with patience.",
      Good: "A steady good fortune is with you. Respond honestly to the people and things before you.",
      "Slightly Good": "A tiny surprise may appear; leave a little room for chance.",
      "Very Good": "Your effort is likely to receive a response today. Move forward with what matters, without needing it to be perfect.",
      Excellent: "The stars are bright. Welcome kindness and share your light with the people around you."
    }
  },
  closing: { zh: "不必一次想清所有答案。今天，只要忠於此刻的自己，就已經足夠。", en: "You do not need to figure out every answer at once. Today, simply stay true to who you are in this moment." }
};

const ui = {
  zh: {
    homeEyebrow: "A LITTLE NOTE FROM THE STARS",
    homeTitle: "讓星光，陪你讀懂<br>今天的自己。",
    homeLead: "選一個屬於你的星座，回答三個小問題，<br>收下一封為此刻而寫的今日星語。",
    homeStart: "開始今日探索 <span>→</span>",
    homeTimeNote: "大約需要 1 分鐘",
    zodiacStepTitle: "選擇你的星座",
    zodiacTitle: "你是哪一個星座？",
    zodiacCopy: "點選星盤上的星座，再按下中央的確定。",
    zodiacConfirm: "確定",
    quizStepTitle: "讀一讀此刻的你",
    moodStepTitle: "留下今天的心情",
    moodTitle: "此刻，你最想說什麼？",
    moodCopy: "可以留白，也可以寫下一句最真實的感受。",
    moodLabel: "今日心情",
    moodPlaceholder: "例如：今天有點累，但也期待某件小事發生……",
    moodBack: "← 上一步",
    moodSubmit: "生成今日星語 <span>✦</span>",
    loadingTitle: "正在讀取今天的星光…",
    loadingCopy: "請稍候片刻。",
    cardBgToggle: "✦ 換背景",
    cardBgStarlight: "星光",
    cardBgSunset: "晚霞",
    cardBgMidnight: "夜空",
    resultEyebrow: "YOUR MESSAGE FOR TODAY",
    fortuneLabel: "今日籤運",
    resultTitle: "你的今日星語",
    moodEchoLabel: "你今天留下的心情",
    saveImage: "💾 儲存圖片",
    shareButton: "📤 分享",
    shareCopy: "複製",
    restartButton: "我明白了。",
    supportButton: "☕ Buy Me a Coffee",
    closeDonateLabel: "關閉贊助視窗",
    donateTitle: "支持 HoroscopeToday",
    donateIntro: "你的鼓勵，讓今天的星光繼續閃耀。",
    donateNotice: "展示功能，不會真的扣款，也不會儲存資料。",
    supporterNameLabel: "你的名字",
    supporterNamePlaceholder: "例如：Alex",
    donationAmountLegend: "贊助金額",
    customAmountLabel: "或自訂金額",
    customAmountPlaceholder: "輸入金額",
    donateMessageLabel: "留下一句祝福",
    donateMessagePlaceholder: "想對團隊說的話……",
    donateSubmit: "確認 Demo 贊助 ✦",
    thankYouTitle: "謝謝你的支持！",
    thankYouText: '<strong id="success-name"></strong>，你送出的 <strong id="success-amount"></strong> Demo 鼓勵已照亮今天的星空。',
    donateSuccessNotice: "這是展示結果，沒有發生實際交易。",
    finishDonate: "完成",
    languageToggle: "切換語言",
    themeToggleLight: "切換為療癒亮色主題",
    themeToggleDark: "切換為神秘深色主題",
    shareStatusCopied: "已複製今日星語。",
    shareStatusFailed: "複製失敗，請手動選取信箋內容。",
    saveImageBusy: "正在製作圖片…",
    saveImageSuccess: "今日星語圖片已儲存。",
    saveImageError: "圖片儲存失敗，請稍後再試。",
    imageToolError: "圖片工具尚未載入，請稍後再試。",
    generationSource: "此封信箋由 AI 為你生成。",
    generationFallback: "AI 暫時沒有回應，已為你使用星光備援信箋。",
    dateFallback: "今天選擇留白。",
    moodPrompt: "今天的心情：",
    moodBlank: "留白"
  },
  en: {
    homeEyebrow: "A LITTLE NOTE FROM THE STARS",
    homeTitle: "Let the starlight help you understand<br>who you are today.",
    homeLead: "Choose your zodiac sign, answer three small questions,<br>and receive a message written just for this moment.",
    homeStart: "Start your reading <span>→</span>",
    homeTimeNote: "Takes about 1 minute",
    zodiacStepTitle: "Choose your sign",
    zodiacTitle: "Which zodiac sign are you?",
    zodiacCopy: "Tap a sign on the wheel, then confirm in the center.",
    zodiacConfirm: "Confirm",
    quizStepTitle: "Read your current self",
    moodStepTitle: "Leave today’s mood",
    moodTitle: "What do you want to say right now?",
    moodCopy: "You can leave it blank, or write the truest feeling you have.",
    moodLabel: "Today’s mood",
    moodPlaceholder: "For example: I am tired today, but I’m also looking forward to something small…",
    moodBack: "← Back",
    moodSubmit: "Generate your star message <span>✦</span>",
    loadingTitle: "Reading today’s starlight…",
    loadingCopy: "Please wait a moment.",
    cardBgToggle: "✦ Change background",
    cardBgStarlight: "Starlight",
    cardBgSunset: "Sunset",
    cardBgMidnight: "Midnight",
    resultEyebrow: "YOUR MESSAGE FOR TODAY",
    fortuneLabel: "Today’s fortune",
    resultTitle: "Your star message today",
    moodEchoLabel: "What you left behind today",
    saveImage: "💾 Save image",
    shareButton: "📤 Share",
    shareCopy: "Copy",
    restartButton: "I understand.",
    supportButton: "☕ Buy Me a Coffee",
    closeDonateLabel: "Close support window",
    donateTitle: "Support HoroscopeToday",
    donateIntro: "Your encouragement helps today’s starlight shine on.",
    donateNotice: "This is a demo feature; no real payment will be made and no data will be stored.",
    supporterNameLabel: "Your name",
    supporterNamePlaceholder: "For example: Alex",
    donationAmountLegend: "Support amount",
    customAmountLabel: "Or enter a custom amount",
    customAmountPlaceholder: "Enter amount",
    donateMessageLabel: "Leave a kind note",
    donateMessagePlaceholder: "What would you like to say to the team…",
    donateSubmit: "Confirm demo support ✦",
    thankYouTitle: "Thank you for your support!",
    thankYouText: '<strong id="success-name"></strong>, your demo encouragement of <strong id="success-amount"></strong> has lit up today’s sky.',
    donateSuccessNotice: "This is a demo result and no real transaction took place.",
    finishDonate: "Done",
    languageToggle: "Switch language",
    themeToggleLight: "Switch to light theme",
    themeToggleDark: "Switch to dark theme",
    shareStatusCopied: "Today’s message has been copied.",
    shareStatusFailed: "Copy failed. Please select the message manually.",
    saveImageBusy: "Creating image…",
    saveImageSuccess: "Your star message image has been saved.",
    saveImageError: "Image saving failed. Please try again later.",
    imageToolError: "The image tool is not ready yet. Please try again later.",
    generationSource: "This message card was generated by AI for you.",
    generationFallback: "The AI did not respond; a backup star message has been prepared for you.",
    dateFallback: "Today is left blank.",
    moodPrompt: "Mood today: ",
    moodBlank: "blank"
  }
};

const freshState = () => ({ zodiac: null, answers: Array(3).fill(null), questionIndex: 0, mood: "", fortune: null, letter: "", generating: false });
let state = freshState();
let currentLanguage = "zh";
const $ = (selector) => document.querySelector(selector);
const screens = [...document.querySelectorAll(".screen")];

function showScreen(id) {
  screens.forEach((screen) => screen.classList.toggle("is-active", screen.id === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
  requestAnimationFrame(() => $(`#${id} h1, #${id} h2`)?.focus({ preventScroll: true }));
}

function getLocalizedText(value, fallback = "") {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") return value[currentLanguage] || value.zh || fallback;
  return fallback;
}

function buildZodiacGrid() {
  $("#zodiac-grid").replaceChildren(...zodiacSigns.map((sign, index) => {
    const button = document.createElement("button");
    button.className = "zodiac-option";
    button.type = "button";
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", "false");
    button.dataset.key = sign.key;
    button.style.setProperty("--zodiac-angle", `${index * 30}deg`);
    button.innerHTML = `<span class="symbol" aria-hidden="true">${sign.symbol}</span>${getLocalizedText(sign.name)}<small>${getLocalizedText(sign.date)}</small>`;
    return button;
  }));
  if (state.zodiac) {
    const selected = document.querySelector(`.zodiac-option[data-key="${state.zodiac}"]`);
    if (selected) selectZodiac(selected, false);
  }
}

function selectZodiac(button, shouldEnable = true) {
  state.zodiac = button.dataset.key;
  document.querySelectorAll(".zodiac-option").forEach((item) => {
    const selected = item === button;
    item.classList.toggle("is-selected", selected);
    item.setAttribute("aria-checked", String(selected));
  });
  if (shouldEnable) $("#zodiac-next").disabled = false;
}

function renderQuestion() {
  const index = state.questionIndex;
  const question = questions[index];
  $("#question-panel").classList.remove("question-enter");
  void $("#question-panel").offsetWidth;
  $("#question-panel").classList.add("question-enter");
  $("#question-title").textContent = getLocalizedText(question.title, "");
  $("#question-hint").textContent = getLocalizedText(question.hint, "");
  $("#progress-label").textContent = `${index + 1} / 3`;
  $("#progress-bar").style.width = `${((index + 1) / 3) * 100}%`;
  $("#quiz-back").textContent = index === 0 ? (currentLanguage === "en" ? "← Back to zodiac" : "← 返回星座") : (currentLanguage === "en" ? "← Previous" : "← 上一題");
  $("#quiz-next").innerHTML = index === 2 ? (currentLanguage === "en" ? "Finish <span>→</span>" : "完成問答 <span>→</span>") : (currentLanguage === "en" ? "Next <span>→</span>" : "下一題 <span>→</span>");
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
    button.append(dot, document.createTextNode(getLocalizedText(answer, "")));
    return button;
  }));
}

function generateLetter() {
  const safe = (value, fallback) => value ?? fallback;
  const opening = fragments.opening[currentLanguage]?.[state.zodiac] || fragments.opening.zh?.[state.zodiac] || "今天的星光正安靜地陪著你。";
  const social = fragments.social[currentLanguage]?.[state.answers[0]] || fragments.social.zh?.[state.answers[0]] || "照顧好自己的界線。";
  const decision = fragments.decision[currentLanguage]?.[state.answers[1]] || fragments.decision.zh?.[state.answers[1]] || "相信你會找到適合的步調。";
  const energy = fragments.energy[currentLanguage]?.[state.answers[2]] || fragments.energy.zh?.[state.answers[2]] || "把能量留給重要的事。";
  const fortuneText = fragments.fortune[currentLanguage]?.[state.fortune] || fragments.fortune.zh?.[state.fortune] || "讓今天自然展開。";
  const closing = fragments.closing[currentLanguage] || fragments.closing.zh || "不必一次想清所有答案。今天，只要忠於此刻的自己，就已經足夠。";
  return [safe(opening, "今天的星光正安靜地陪著你。"), safe(social, "照顧好自己的界線。"), safe(decision, "相信你會找到適合的步調。"), safe(energy, "把能量留給重要的事。"), safe(fortuneText, "讓今天自然展開。"), closing].join("\n\n");
}

function renderResult() {
  $("#fortune-output").textContent = state.fortune;
  $("#letter-output").replaceChildren(...state.letter.split("\n\n").map((text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    return paragraph;
  }));
  $("#mood-output").textContent = state.mood.trim() || ui[currentLanguage].dateFallback;
  $("#card-date").textContent = formatToday();
  $("#share-status").textContent = "";
}

function formatToday() {
  const locale = currentLanguage === "en" ? "en-US" : "zh-TW";
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric", weekday: "long" }).format(new Date());
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
    $("#generation-source").textContent = ui[currentLanguage].generationSource;
  } finally {
    window.clearTimeout(timeout);
  }
}

async function submitMood() {
  if (state.generating) return;
  state.generating = true;
  $("#mood-submit").disabled = true;
  state.mood = $("#mood-input").value;
  state.fortune = fortunes[currentLanguage][Math.floor(Math.random() * fortunes[currentLanguage].length)];
  state.letter = generateLetter();
  showScreen("loading-screen");
  $("#generation-source").textContent = "";
  try {
    await requestApiLetter();
  } catch {
    $("#generation-source").textContent = ui[currentLanguage].generationFallback;
  } finally {
    renderResult();
    state.generating = false;
    $("#mood-submit").disabled = false;
    showScreen("result-screen");
  }
}

function shareText() {
  return `HoroscopeToday｜${currentLanguage === "en" ? "Today’s fortune" : "今日籤運"}: ${state.fortune}\n\n${state.letter}\n\n${ui[currentLanguage].moodPrompt}${state.mood.trim() || ui[currentLanguage].moodBlank}`;
}

async function shareResult() {
  const data = { title: "HoroscopeToday 今日星語", text: shareText() };
  try {
    if (navigator.share) await navigator.share(data);
    else if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(data.text); $("#share-status").textContent = ui[currentLanguage].shareStatusCopied; }
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
    $("#share-status").textContent = copied ? ui[currentLanguage].shareStatusCopied : ui[currentLanguage].shareStatusFailed;
  }
}

async function copyShareText() {
  try {
    await navigator.clipboard.writeText(shareText());
    $("#share-status").textContent = ui[currentLanguage].shareStatusCopied;
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
    $("#share-status").textContent = ui[currentLanguage].imageToolError;
    return;
  }
  const button = $("#save-image");
  button.disabled = true;
  $("#share-status").textContent = ui[currentLanguage].saveImageBusy;
  try {
    const canvas = await window.html2canvas($("#result-card"), { scale: 2, backgroundColor: null, useCORS: true });
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) throw new Error("image failed");
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `HoroscopeToday-${new Date().toISOString().slice(0, 10)}.png`;
    link.click();
    URL.revokeObjectURL(url);
    $("#share-status").textContent = ui[currentLanguage].saveImageSuccess;
  } catch {
    $("#share-status").textContent = ui[currentLanguage].saveImageError;
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

function applyLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang === "en" ? "en" : "zh-Hant";
  document.body.dataset.lang = lang;
  const dict = ui[lang];

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dict[key] !== undefined) element.innerHTML = dict[key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (dict[key] !== undefined) element.setAttribute("placeholder", dict[key]);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const key = element.dataset.i18nAria;
    if (dict[key] !== undefined) element.setAttribute("aria-label", dict[key]);
  });

  $("#lang-picker-label").textContent = lang === "en" ? "English" : "中文";
  $("#language-toggle").setAttribute("aria-label", dict.languageToggle);
  document.querySelectorAll(".lang-option").forEach((option) => {
    const selected = option.dataset.lang === lang;
    option.classList.toggle("is-selected", selected);
    option.setAttribute("aria-pressed", String(selected));
  });

  $("#theme-toggle").setAttribute("aria-label", document.body.classList.contains("theme-dark") ? dict.themeToggleLight : dict.themeToggleDark);
  $("#date-display").textContent = formatToday();
  if (state.questionIndex !== undefined) renderQuestion();
  if (state.letter || state.mood || state.fortune || state.zodiac) renderResult();
  buildZodiacGrid();
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

$("#language-toggle").addEventListener("click", () => {
  const menu = $("#language-menu");
  menu.hidden = !menu.hidden;
  $("#language-toggle").setAttribute("aria-expanded", String(!menu.hidden));
});
$("#language-menu").addEventListener("click", (event) => {
  const button = event.target.closest("[data-lang]");
  if (!button) return;
  applyLanguage(button.dataset.lang);
  $("#language-menu").hidden = true;
  $("#language-toggle").setAttribute("aria-expanded", "false");
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".lang-picker-wrap")) {
    $("#language-menu").hidden = true;
    $("#language-toggle").setAttribute("aria-expanded", "false");
  }
});

buildZodiacGrid();
$("#date-display").textContent = formatToday();

const donateModal = $("#donate-modal");
const donateFormStep = $("#donate-form-step");
const donateSuccessStep = $("#donate-success-step");
const amountButtons = [...document.querySelectorAll(".amount-button")];
let selectedDonateAmount = null;

function setDonateModal(open) {
  donateModal.hidden = !open;
  document.body.classList.toggle("modal-open", open);
  if (open) $("#close-donate").focus();
}

function resetDonateDemo() {
  $("#donate-form").reset();
  selectedDonateAmount = null;
  amountButtons.forEach((button) => {
    button.classList.remove("is-selected");
    button.setAttribute("aria-pressed", "false");
  });
  $("#donate-error").textContent = "";
  donateFormStep.hidden = false;
  donateSuccessStep.hidden = true;
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
    pieces.forEach((piece) => { piece.y += piece.speed; piece.x += piece.drift; context.fillRect(piece.x, piece.y, piece.size, piece.size); });
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
    $("#donate-error").textContent = currentLanguage === "en" ? "Please enter your name and a valid support amount." : "請填寫名字，並選擇有效的贊助金額。";
    return;
  }
  $("#success-name").textContent = name;
  $("#success-amount").textContent = `NT$${amount.toLocaleString("zh-TW")}`;
  donateFormStep.hidden = true;
  donateSuccessStep.hidden = false;
  $("#finish-donate").focus();
  fireConfetti();
});

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("theme-dark", isDark);
  $("#theme-toggle").setAttribute("aria-pressed", String(isDark));
  $("#theme-toggle").setAttribute("aria-label", isDark ? ui[currentLanguage].themeToggleLight : ui[currentLanguage].themeToggleDark);
  $(".theme-toggle-icon").textContent = isDark ? "☀" : "☾";
  try { localStorage.setItem("horoscope-theme", isDark ? "dark" : "light"); } catch {}
}

let savedTheme = "light";
try { savedTheme = localStorage.getItem("horoscope-theme") || "light"; } catch {}
applyTheme(savedTheme === "dark" ? "dark" : "light");

$("#theme-toggle").addEventListener("click", () => {
  applyTheme(document.body.classList.contains("theme-dark") ? "light" : "dark");
});

applyLanguage("zh");
