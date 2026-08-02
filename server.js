const express = require('express');
const app = express();
const PORT = 3000;

// 測試用路由
app.get('/', (req, res) => {
  res.send('🎉 恭喜！你的 Node.js Express 伺服器成功啟動了！');
});

// 啟動伺服器並監聽 PORT 3000
app.listen(PORT, () => {
  console.log(`🚀 伺服器正在運作中：http://localhost:${PORT}`);
});