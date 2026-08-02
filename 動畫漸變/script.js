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
let isDarkMode = false; // 將 dark mode 狀態拉至全域以便判斷
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
    return button;
  }));
  
  document.querySelectorAll('.zodiac-option').forEach(btn => {
    btn.addEventListener('click', () => selectZodiac(btn));
  });
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

  $("#answer-list").replaceChildren(...question.answers.map((ans, i) => {
    const btn = document.createElement("button");
    btn.className = "answer-option";
    btn.textContent = ans;
    
    // 依據當前模式賦予正確的背景與文字色，防止點擊時跑版
    if (isDarkMode) {
      btn.style.backgroundColor = 'rgb(28, 28, 32)';
      btn.style.color = 'rgb(238, 238, 238)';
    }

    if (state.answers[index] === i) {
      btn.classList.add("is-selected");
      if (isDarkMode) {
        btn.style.backgroundColor = 'rgb(45, 45, 52)'; // 深色模式下選中的微調底色
      }
    }

    btn.addEventListener("click", () => {
      state.answers[index] = i;
      renderQuestion();
    });
    return btn;
  }));
}

// ---------------------------------------------------------
// DOM 載入初始化
// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  buildZodiacGrid();
  
  const today = new Date();
  const dateString = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
  if ($("#date-display")) $("#date-display").textContent = dateString;
  
  $("#start-button")?.addEventListener("click", () => showScreen("zodiac-screen"));
  
  $("#zodiac-next")?.addEventListener("click", () => {
    state.questionIndex = 0;
    renderQuestion();
    showScreen("quiz-screen");
  });

  $("#quiz-back")?.addEventListener("click", () => {
    if (state.questionIndex > 0) {
      state.questionIndex--;
      renderQuestion();
    } else {
      showScreen("zodiac-screen");
    }
  });

  $("#quiz-next")?.addEventListener("click", () => {
    if (state.questionIndex < 2) {
      state.questionIndex++;
      renderQuestion();
    } else {
      showScreen("mood-screen");
    }
  });

  $("#mood-back")?.addEventListener("click", () => showScreen("quiz-screen"));
  
  $("#mood-input")?.addEventListener("input", (e) => {
    $("#char-count").textContent = e.target.value.length;
  });

  $("#mood-submit")?.addEventListener("click", () => {
    state.mood = $("#mood-input").value.trim();
    showScreen("loading-screen");
    setTimeout(generateResult, 1500);
  });

  $("#restart-button")?.addEventListener("click", () => {
    state = freshState();
    $("#mood-input").value = "";
    $("#char-count").textContent = "0";
    $("#zodiac-next").disabled = true;
    document.querySelectorAll(".zodiac-option").forEach(btn => {
      btn.classList.remove("is-selected");
      btn.setAttribute("aria-checked", "false");
    });
    showScreen("home-screen");
  });

  $("#theme-toggle")?.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    $("#theme-toggle").setAttribute("aria-pressed", isDarkMode);
    manualThemeTransition(isDarkMode);
  });
});

function generateResult() {
  const fIndex = Math.floor(Math.random() * fortunes.length);
  state.fortune = fortunes[fIndex];
  
  let resultText = `<p>${fragments.opening[state.zodiac]}</p>`;
  resultText += `<p>${fragments.social[state.answers[0]]}</p>`;
  resultText += `<p>${fragments.decision[state.answers[1]]}</p>`;
  resultText += `<p>${fragments.energy[state.answers[2]]}</p>`;
  resultText += `<p>${fragments.fortune[state.fortune]}</p>`;
  resultText += `<p>${fragments.closing}</p>`;

  $("#card-date").textContent = $("#date-display").textContent;
  $("#fortune-output").textContent = state.fortune;
  $("#letter-output").innerHTML = resultText;
  
  if (state.mood) {
    $("#mood-output").textContent = `「${state.mood}」`;
    $(".mood-echo").style.display = "block";
  } else {
    $(".mood-echo").style.display = "none";
  }

  showScreen("result-screen");
}

// ---------------------------------------------------------
// JS 動態覆寫全元素顏色轉換
// ---------------------------------------------------------
function manualThemeTransition(dark) {
  const targetBg = dark ? [18, 18, 20] : [248, 246, 240];     
  const targetColor = dark ? [238, 238, 238] : [34, 34, 34];  

  const lightGradient = 'radial-gradient(circle at 10% 20%, rgba(180, 160, 220, 1) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(240, 200, 180, 1) 0%, transparent 50%)';
  const darkGradient = 'none'; 

  const elements = document.querySelectorAll('*');
  const duration = 1200; 
  const frames = 40;     
  const interval = duration / frames;
  
  const animations = [];

  elements.forEach(el => {
    if (el.classList.contains('primary-button') || el.closest('.coffee-button') || el.classList.contains('coffee-button')) {
      return;
    }

    const style = window.getComputedStyle(el);
    const bg = style.backgroundColor;
    const color = style.color;

    const bgMatch = bg.match(/[\d.]+/g);
    const isTransparentBg = bg === 'transparent' || (bgMatch && bgMatch.length === 4 && parseFloat(bgMatch[3]) === 0);
    const colorMatch = color.match(/[\d.]+/g);

    if (colorMatch) {
      if (el.tagName === 'BODY') {
        el.style.backgroundImage = dark ? darkGradient : lightGradient;
      } else {
        el.style.backgroundImage = 'none';
      }

      animations.push({
        el: el,
        startBg: isTransparentBg ? null : (bgMatch ? bgMatch.slice(0, 3).map(Number) : [255, 255, 255]),
        startColor: colorMatch.slice(0, 3).map(Number),
        targetBg: targetBg,
        targetColor: targetColor 
      });
    }
  });

  let currentFrame = 0;
  
  const timer = setInterval(() => {
    currentFrame++;
    const progress = currentFrame / frames; 

    animations.forEach(anim => {
      if (anim.startBg) {
        const r = Math.round(anim.startBg[0] + (anim.targetBg[0] - anim.startBg[0]) * progress);
        const g = Math.round(anim.startBg[1] + (anim.targetBg[1] - anim.startBg[1]) * progress);
        const b = Math.round(anim.startBg[2] + (anim.targetBg[2] - anim.startBg[2]) * progress);
        anim.el.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      }

      const cr = Math.round(anim.startColor[0] + (anim.targetColor[0] - anim.startColor[0]) * progress);
      const cg = Math.round(anim.startColor[1] + (anim.targetColor[1] - anim.startColor[1]) * progress);
      const cb = Math.round(anim.startColor[2] + (anim.targetColor[2] - anim.startColor[2]) * progress);
      anim.el.style.color = `rgb(${cr}, ${cg}, ${cb})`;
      
      anim.el.style.transition = 'none'; 
    });

    if (currentFrame >= frames) {
      clearInterval(timer);
    }
  }, interval);
}