const ALLOWED_ZODIACS = new Set(["牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座", "天秤座", "天蠍座", "射手座", "摩羯座", "水瓶座", "雙魚座"]);
const ALLOWED_FORTUNES = new Set(["大凶", "凶", "末吉", "吉", "小吉", "中吉", "大吉"]);
const ANSWER_KEYS = ["social", "decision", "energy"];

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
});

function validate(body) {
  if (!body || typeof body !== "object") return "資料格式不正確";
  if (!ALLOWED_ZODIACS.has(body.zodiac)) return "星座資料不正確";
  if (!ALLOWED_FORTUNES.has(body.fortune)) return "籤運資料不正確";
  if (!body.answers || ANSWER_KEYS.some((key) => ![0, 1].includes(body.answers[key]))) return "問答資料不正確";
  if (typeof body.mood !== "string" || body.mood.length > 300) return "心情文字過長";
  return null;
}

function buildPrompt(data) {
  const choices = {
    social: ["主動靠近並分享感受", "保留空間並安靜陪伴自己"],
    decision: ["先跨出一步再調整", "先看清方向再決定"],
    energy: ["能量明亮而流動", "能量柔和，需要充電"]
  };
  return JSON.stringify({
    星座: data.zodiac,
    社交狀態: choices.social[data.answers.social],
    決策方式: choices.decision[data.answers.decision],
    今日能量: choices.energy[data.answers.energy],
    籤運: data.fortune,
    使用者心情: data.mood.trim() || "留白"
  });
}

async function generateLetter(request, env) {
  if (!env.OPENROUTER_API_KEY) return json({ error: "伺服器尚未設定 API Key" }, 503);
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 4096) return json({ error: "請求內容過大" }, 413);

  let body;
  try { body = await request.json(); } catch { return json({ error: "JSON 格式不正確" }, 400); }
  const error = validate(body);
  if (error) return json({ error }, 400);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Authorization": `Bearer ${env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": new URL(request.url).origin,
        "X-OpenRouter-Title": "HoroscopeToday"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        temperature: 0.8,
        max_tokens: 500,
        messages: [
          { role: "system", content: "你是 HoroscopeToday 的繁體中文信箋作者。根據資料寫溫暖、簡潔、不武斷的今日星語。不得做醫療、財務、災難或死亡預言；不可聲稱星座能確定未來。輸出必須符合指定 JSON Schema。" },
          { role: "user", content: `請根據以下資料寫一封約 180 至 260 字的信箋：${buildPrompt(body)}` }
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "horoscope_letter",
            strict: true,
            schema: {
              type: "object",
              properties: {
                title: { type: "string" },
                letter: { type: "string" },
                closing: { type: "string" }
              },
              required: ["title", "letter", "closing"],
              additionalProperties: false
            }
          }
        }
      })
    });
    const result = await response.json();
    if (!response.ok || result.error) return json({ error: "AI 服務暫時無法使用" }, 502);
    const raw = result.choices?.[0]?.message?.content;
    const parsed = JSON.parse(raw);
    if (![parsed.title, parsed.letter, parsed.closing].every((value) => typeof value === "string" && value.trim())) throw new Error("invalid response");
    return json({ title: parsed.title.trim(), letter: parsed.letter.trim(), closing: parsed.closing.trim() });
  } catch {
    return json({ error: "AI 服務暫時無法使用" }, 502);
  } finally {
    clearTimeout(timeout);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/generate") {
      if (request.method !== "POST") return json({ error: "只接受 POST 請求" }, 405);
      return generateLetter(request, env);
    }
    return env.ASSETS.fetch(request);
  }
};

