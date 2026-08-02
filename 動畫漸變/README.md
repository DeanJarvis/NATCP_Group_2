# HoroscopeToday
分享儲存圖片按鈕無法點擊
HoroscopeToday 是一個純前端的單頁星座體驗。使用者選擇星座、回答三題二選一問題並留下可選的今日心情後，系統會抽取「大凶～大吉」籤運，並以固定規則組合個人化今日星語。

## 功能

- 十二星座單選
- 三題二選一問答與進度顯示
- 今日心情輸入（可留白）
- 隨機籤運與 OpenRouter AI 個人化信箋
- API 失敗時自動切換規則式備援信箋
- 原生分享及複製文字備援
- 完整重新開始與狀態清除
- 手機與桌面響應式排版
- Buy Me a Coffee Demo 贊助互動（不會實際扣款）
- 亮色／深色主題切換，並記住使用者選擇
- 十二星座圓形星盤選擇介面
- 今日日期與結果字卡背景切換
- 今日星語 PNG 儲存及多平台分享選單

## 使用方式

1. 在 `.env` 設定 `OPENROUTER_API_KEY`
2. 執行 `npm install`
3. 執行 `npm run dev`

請勿將 `.env` 提交至 Git。

## 技術

前端使用原生 HTML、CSS、JavaScript；API 使用 Cloudflare Worker 與 OpenRouter。

## 線上版本

推送至 `main` 後，GitHub Actions 會自動部署至 GitHub Pages：

https://deanjarvis.github.io/NATCP_Group_2/
