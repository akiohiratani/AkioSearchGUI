const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 静的ファイルの提供
app.use(express.static(path.join(__dirname, 'build')));

// すべてのリクエストをindex.htmlに転送
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`アプリケーションが http://localhost:${PORT} で起動しました`);
  // ブラウザを自動で開く
  require('child_process').exec(process.platform === 'win32' ? 
    `start http://localhost:${PORT}` : 
    (process.platform === 'darwin' ? 
      `open http://localhost:${PORT}` : 
      `xdg-open http://localhost:${PORT}`));
});
