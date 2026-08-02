const http = require("http");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

function loadEnvFile() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile();

const config = {
  merchantId: process.env.MERCHANT_ID,
  hashKey: process.env.HASH_KEY,
  hashIv: process.env.HASH_IV,
  returnUrl: process.env.RETURN_URL,
  orderResultUrl: process.env.ORDER_RESULT_URL || "",
  port: Number(process.env.PORT) || 3000,
  ecpayUrl: "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5"
};

const missing = [["MERCHANT_ID", config.merchantId], ["HASH_KEY", config.hashKey], ["HASH_IV", config.hashIv], ["RETURN_URL", config.returnUrl]]
  .filter(([, value]) => !value)
  .map(([key]) => key);
if (missing.length) throw new Error(`缺少環境變數：${missing.join(", ")}。請複製 .env.example 為 .env。`);

function urlEncodeDotNet(value) {
  return encodeURIComponent(value)
    .replace(/%20/g, "+")
    .replace(/%2D/gi, "-")
    .replace(/%5F/gi, "_")
    .replace(/%2E/gi, ".")
    .replace(/%21/gi, "!")
    .replace(/%2A/gi, "*")
    .replace(/%28/gi, "(")
    .replace(/%29/gi, ")")
    .replace(/'/g, "%27")
    .replace(/~/g, "%7e");
}

function createCheckMacValue(params) {
  const query = Object.keys(params)
    .filter((key) => key.toLowerCase() !== "checkmacvalue")
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const raw = `HashKey=${config.hashKey}&${query}&HashIV=${config.hashIv}`;
  return crypto.createHash("sha256").update(urlEncodeDotNet(raw).toLowerCase()).digest("hex").toUpperCase();
}

function verifyCheckMacValue(params) {
  const received = String(params.CheckMacValue || "").toUpperCase();
  const expected = createCheckMacValue(params);
  if (received.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(received), Buffer.from(expected));
}

function tradeDate(date = new Date()) {
  const pad = (number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function createTradeNo(date = new Date()) {
  const pad = (number) => String(number).padStart(2, "0");
  const timestamp = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
  return `HT${timestamp}${crypto.randomBytes(2).toString("hex").toUpperCase()}`;
}

function parseAmount(value) {
  const amount = Number(value);
  if (!Number.isSafeInteger(amount) || amount < 1 || amount > 100000) return null;
  return amount;
}

function buildPayment(amount) {
  const params = {
    MerchantID: config.merchantId,
    MerchantTradeNo: createTradeNo(),
    MerchantTradeDate: tradeDate(),
    PaymentType: "aio",
    TotalAmount: String(amount),
    TradeDesc: "HoroscopeToday support",
    ItemName: `HoroscopeToday support NT$${amount}`,
    ReturnURL: config.returnUrl,
    ChoosePayment: "Credit",
    EncryptType: "1"
  };
  if (config.orderResultUrl) params.OrderResultURL = config.orderResultUrl;
  params.CheckMacValue = createCheckMacValue(params);
  return params;
}

function escapeHtml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function readForm(req, limit = 16384) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > limit) reject(new Error("payload too large"));
    });
    req.on("end", () => resolve(Object.fromEntries(new URLSearchParams(body))));
    req.on("error", reject);
  });
}

function send(res, status, contentType, body) {
  res.writeHead(status, { "Content-Type": contentType, "X-Content-Type-Options": "nosniff", "Cache-Control": "no-store" });
  res.end(body);
}

function paymentFormPage(params) {
  const inputs = Object.entries(params).map(([key, value]) => `<input type="hidden" name="${escapeHtml(key)}" value="${escapeHtml(value)}">`).join("\n");
  return `<!doctype html><html lang="zh-Hant"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>前往綠界付款</title></head><body><p>正在安全導向綠界測試付款頁……</p><form id="ecpay" method="POST" action="${config.ecpayUrl}">${inputs}</form><script>document.getElementById("ecpay").submit();</script></body></html>`;
}

const staticFiles = new Map([
  ["/", ["index.html", "text/html; charset=utf-8"]],
  ["/index.html", ["index.html", "text/html; charset=utf-8"]],
  ["/style.css", ["style.css", "text/css; charset=utf-8"]],
  ["/script.js", ["script.js", "text/javascript; charset=utf-8"]]
]);
const recentPayments = new Map();

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

    if (req.method === "GET" && staticFiles.has(url.pathname)) {
      const [fileName, contentType] = staticFiles.get(url.pathname);
      const filePath = path.join(__dirname, "..", fileName);
      return send(res, 200, contentType, fs.readFileSync(filePath));
    }

    if (req.method === "POST" && url.pathname === "/pay") {
      const now = Date.now();
      const client = req.socket.remoteAddress || "unknown";
      if (now - (recentPayments.get(client) || 0) < 3000) return send(res, 429, "text/plain; charset=utf-8", "請稍候再建立付款訂單。");
      const form = await readForm(req);
      const amount = parseAmount(form.amount);
      if (amount === null) return send(res, 400, "text/plain; charset=utf-8", "付款金額必須是 1 到 100000 的整數。");
      recentPayments.set(client, now);
      return send(res, 200, "text/html; charset=utf-8", paymentFormPage(buildPayment(amount)));
    }

    if (req.method === "POST" && url.pathname === "/payment-result") {
      const result = await readForm(req);
      if (!verifyCheckMacValue(result)) return send(res, 400, "text/plain; charset=utf-8", "0|CheckMacValueError");
      return send(res, 200, "text/plain; charset=utf-8", "1|OK");
    }

    if (req.method === "GET" && url.pathname === "/payment-complete") {
      return send(res, 200, "text/html; charset=utf-8", "<!doctype html><html lang=\"zh-Hant\"><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>付款結果</title><body><h1>已返回 HoroscopeToday</h1><p>付款最終結果以綠界伺服器通知為準。</p><p><a href=\"/\">回到首頁</a></p></body></html>");
    }

    send(res, 404, "text/plain; charset=utf-8", "Not Found");
  } catch {
    send(res, 500, "text/plain; charset=utf-8", "付款服務暫時無法處理請求。");
  }
});

if (require.main === module) {
  server.listen(config.port, () => {
    console.log(`HoroscopeToday 綠界 Stage：http://localhost:${config.port}`);
    if (/example\.com|localhost|127\.0\.0\.1/i.test(config.returnUrl)) console.warn("警告：RETURN_URL 目前不是綠界可呼叫的公開 HTTPS 網址，付款通知不會成功。");
  });
}

module.exports = { buildPayment, createCheckMacValue, createTradeNo, parseAmount, server, verifyCheckMacValue };
