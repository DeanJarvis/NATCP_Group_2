# GMM 金流整合 Task

## 目前連結流程

```text
HoroscopeToday Coffee 視窗
→ POST /pay
→ GMM/server.js 建立訂單與 CheckMacValue
→ 綠界 Stage 測試付款頁
→ POST RETURN_URL（付款結果通知）
→ 回到 HoroscopeToday 顯示結果
```

## 第一階段：啟動與基本偵錯

- [x] 解決根目錄 ES Module 與 GMM CommonJS 衝突
- [x] 加入 GMM 專用啟動與語法檢查指令
- [x] 保持測試環境網址，不切換正式金流
- [ ] 確認 `RETURN_URL` 是外網可存取的 HTTPS 網址

## 第二階段：後端付款資料

- [ ] `/pay` 接收 Coffee 視窗傳來的金額
- [ ] 限制並驗證允許的付款金額
- [ ] 產生不重複且符合綠界長度限制的交易編號
- [ ] 加入付款結果通知端點
- [ ] 驗證綠界回傳的 `CheckMacValue`
- [ ] 正確回覆綠界 `1|OK`
- [ ] 避免把姓名、祝福或金鑰寫入日誌

## 第三階段：前端連結

- [ ] Coffee 表單安全連到 `/pay`
- [ ] 送出期間鎖定按鈕，避免重複訂單
- [ ] 後端未啟動時顯示清楚錯誤
- [ ] 付款取消或失敗時可回 HoroscopeToday
- [ ] 成功返回時顯示測試付款結果

## 第四階段：測試

- [ ] 測試 NT$50、NT$100、NT$500 與自訂金額
- [ ] 測試空白、負數、過大金額與重複送出
- [ ] 測試錯誤 CheckMacValue 不會被接受
- [ ] 使用綠界 Stage 測試卡完成沙盒流程
- [ ] 確認 `.env` 與金鑰不會提交 Git

> 本資料夾目前只允許綠界 Stage 測試環境；正式上線前需要另外進行資安、法規與商店資料檢查。
