const zodiacSigns = [
  ["♈", "牡羊座", "3/21–4/19"], ["♉", "金牛座", "4/20–5/20"],
  ["♊", "雙子座", "5/21–6/20"], ["♋", "巨蟹座", "6/21–7/22"],
  ["♌", "獅子座", "7/23–8/22"], ["♍", "處女座", "8/23–9/22"],
  ["♎", "天秤座", "9/23–10/22"], ["♏", "天蠍座", "10/23–11/21"],
  ["♐", "射手座", "11/22–12/21"], ["♑", "摩羯座", "12/22–1/19"],
  ["♒", "水瓶座", "1/20–2/18"], ["♓", "雙魚座", "2/19–3/20"]
];

const questions = [
  { title: "今天醒來時，你的能量比較像？", hint: "跟著第一個直覺選就好。", answers: ["安靜而緩慢", "輕盈而有期待", "忙亂，需要喘口氣", "充滿動力，想做點什麼"] },
  { title: "此刻，你最需要的是什麼？", hint: "選擇最貼近心裡的那一句。", answers: ["一點不被打擾的空間", "有人理解我的感受", "一個清楚的方向", "一些意外的小驚喜"] },
  { title: "今天，你想把注意力放在哪裡？", hint: "沒有標準答案，只要忠於自己。", answers: ["照顧自己的身心", "完成重要的小目標", "和在乎的人好好相處", "放下控制，順其自然"] }
];

const initialState = () => ({ zodiac: null, answers: Array(questions.length).fill(null), questionIndex: 0, mood: "" });
let state = initialState();

const screens = [...document.querySelectorAll(".screen")];
const zodiacGrid = document.querySelector("#zodiac-grid");
const zodiacNext = document.querySelector("#zodiac-next");
const quizNext = document.querySelector("#quiz-next");
const moodInput = document.querySelector("#mood-input");

function showScreen(id) {
  screens.forEach((screen) => screen.classList.toggle("is-active", screen.id === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.querySelector(`#${id} h1, #${id} h2`)?.focus({ preventScroll: true });
}

function buildZodiacGrid() {
  zodiacGrid.innerHTML = zodiacSigns.map(([symbol, name, date]) => `
    <button class="zodiac-option" type="button" role="radio" aria-checked="false" data-name="${name}">
      <span class="symbol" aria-hidden="true">${symbol}</span>${name}<small>${date}</small>
    </button>`).join("");
}

function selectZodiac(button) {
  state.zodiac = button.dataset.name;
  document.querySelectorAll(".zodiac-option").forEach((item) => {
    const selected = item === button;
    item.classList.toggle("is-selected", selected);
    item.setAttribute("aria-checked", String(selected));
  });
  zodiacNext.disabled = false;
}

function renderQuestion() {
  const index = state.questionIndex;
  const question = questions[index];
  document.querySelector("#question-title").textContent = question.title;
  document.querySelector("#question-hint").textContent = question.hint;
  document.querySelector("#progress-label").textContent = `${index + 1} / ${questions.length}`;
  document.querySelector("#progress-bar").style.width = `${((index + 1) / questions.length) * 100}%`;
  document.querySelector("#quiz-back").textContent = index === 0 ? "← 返回星座" : "← 上一題";
  quizNext.innerHTML = index === questions.length - 1 ? "完成問答 <span>→</span>" : "下一題 <span>→</span>";
  quizNext.disabled = state.answers[index] === null;

  document.querySelector("#answer-list").innerHTML = question.answers.map((answer, answerIndex) => {
    const selected = state.answers[index] === answerIndex;
    return `<button class="answer-option${selected ? " is-selected" : ""}" type="button" role="radio" aria-checked="${selected}" data-index="${answerIndex}"><span class="answer-dot" aria-hidden="true"></span>${answer}</button>`;
  }).join("");
}

function resetApp() {
  state = initialState();
  moodInput.value = "";
  document.querySelector("#char-count").textContent = "0";
  zodiacNext.disabled = true;
  document.querySelectorAll(".zodiac-option").forEach((item) => {
    item.classList.remove("is-selected");
    item.setAttribute("aria-checked", "false");
  });
  showScreen("home-screen");
}

document.querySelector("#start-button").addEventListener("click", () => showScreen("zodiac-screen"));
zodiacGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".zodiac-option");
  if (button) selectZodiac(button);
});
zodiacNext.addEventListener("click", () => { state.questionIndex = 0; renderQuestion(); showScreen("quiz-screen"); });

document.querySelector("#answer-list").addEventListener("click", (event) => {
  const button = event.target.closest(".answer-option");
  if (!button) return;
  state.answers[state.questionIndex] = Number(button.dataset.index);
  renderQuestion();
});

quizNext.addEventListener("click", () => {
  if (state.questionIndex < questions.length - 1) { state.questionIndex += 1; renderQuestion(); }
  else { moodInput.value = state.mood; showScreen("mood-screen"); }
});

document.querySelector("#quiz-back").addEventListener("click", () => {
  if (state.questionIndex === 0) showScreen("zodiac-screen");
  else { state.questionIndex -= 1; renderQuestion(); }
});

moodInput.addEventListener("input", () => {
  state.mood = moodInput.value;
  document.querySelector("#char-count").textContent = String(moodInput.value.length);
});
document.querySelector("#mood-back").addEventListener("click", () => { state.questionIndex = questions.length - 1; renderQuestion(); showScreen("quiz-screen"); });
document.querySelector("#mood-submit").addEventListener("click", () => {
  document.querySelector("#letter-to").textContent = `給今天的${state.zodiac}：`;
  showScreen("result-screen");
});
document.querySelector("#restart-button").addEventListener("click", resetApp);

buildZodiacGrid();
