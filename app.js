// 寫入簡單的控制台輸出
console.log("Hello, Node.js!");

// 或是建立一個簡單的網頁伺服器 (Server)
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end('你好！這是我的第一個 Node.js 伺服器！');
});

server.listen(3000, () => {
  console.log('伺服器已啟動：http://localhost:3000');
});