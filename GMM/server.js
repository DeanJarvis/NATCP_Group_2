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
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile();

const MERCHANT_ID = process.env.MERCHANT_ID;
const HASH_KEY = process.env.HASH_KEY;
const HASH_IV = process.env.HASH_IV;
const RETURN_URL = process.env.RETURN_URL;
const ECPAY_URL = "https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5";

const missing = ["MERCHANT_ID", "HASH_KEY", "HASH_IV", "RETURN_URL"]
  .filter((key) => !process.env[key]);
if (missing.length) {
  throw new Error(`缺少環境變數：${missing.join(", ")}。請複製 .env.example 為 .env。`);
}

function urlEncodeDotNet(value) {
  return encodeURIComponent(value)
    .replace(/%20/g, "+")
    .replace(/'/g, "%27")
    .replace(/~/g, "%7e");
}

function checkMacValue(params) {
  const query = Object.keys(params)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const raw = `HashKey=${HASH_KEY}&${query}&HashIV=${HASH_IV}`;

  // 綠界規格：URL encode → 全部轉小寫 → SHA256 → 結果轉大寫。
  const encoded = urlEncodeDotNet(raw).toLowerCase();
  return crypto.createHash("sha256").update(encoded).digest("hex").toUpperCase();
}

function tradeDate() {
  const date = new Date();
  const pad = (number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildPayment() {
  const params = {
    MerchantID: MERCHANT_ID,
    MerchantTradeNo: `CAMP${Date.now()}`,
    MerchantTradeDate: tradeDate(),
    PaymentType: "aio",
    TotalAmount: "100",
    TradeDesc: "vibe coding camp test",
    ItemName: "Vibe Coding 專案 x 1",
    ReturnURL: RETURN_URL,
    ChoosePayment: "Credit",
    EncryptType: "1",
  };
  params.CheckMacValue = checkMacValue(params);
  return params;
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/pay") {
    const inputs = Object.entries(buildPayment())
      .map(([key, value]) => `    <input type="hidden" name="${escapeHtml(key)}" value="${escapeHtml(value)}">`)
      .join("\n");

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<!DOCTYPE html>
<html lang="zh-TW">
<body>
  <p>導向綠界付款頁中…</p>
  <form id="ecpay" method="POST" action="${ECPAY_URL}">
${inputs}
  </form>
  <script>document.getElementById("ecpay").submit();</script>
</body>
</html>`);
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>我的作品集 - 付款</title>
  <style>
    body { font-family: "Microsoft JhengHei", sans-serif; max-width: 420px; margin: 80px auto; text-align: center; }
    h1 { color: #4f46e5; }
    .price { font-size: 28px; margin: 24px 0; }
    button { font-size: 20px; padding: 10px 32px; background: #4f46e5; color: #fff; border: 0; border-radius: 6px; cursor: pointer; }
  </style>
</head>
<body>
  <h1>Vibe Coding 專案</h1>
  <div class="price">NT$ 100</div>
  <form method="POST" action="/pay">
    <button type="submit">付款</button>
  </form>
</body>
</html>`);
});

server.listen(3000, () => {
  console.log("伺服器已啟動：http://localhost:3000");
});
