# 綠界 ECPay 測試付款範例

## 執行方式

1. 將 `.env.example` 複製為 `.env`。
2. 確認 `.env` 內的測試帳號與 `RETURN_URL`。
3. 在 `GMM` 資料夾執行：

```bash
npm start
```

4. 開啟 <http://localhost:3000>，不要直接以 `file://` 開啟網站。

## 注意

- 預設帳號只適用於綠界測試環境，不會真的扣款。
- `RETURN_URL` 必須是綠界能從網際網路存取的 HTTPS 網址；本機開發可使用安全的 tunnel 服務。
- 將公開的 `/payment-result` 設為 `RETURN_URL`；可將 `/payment-complete` 設為 `ORDER_RESULT_URL`。
- 測試信用卡：`4311-9522-2222-2222`，安全碼 `222`，有效期限可填未來日期。
- 金流連結與後續工作請查看 `TASKS.md`。
