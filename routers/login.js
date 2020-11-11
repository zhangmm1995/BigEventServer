const express = require('express');
const router = express.Router();

router.post('/reguser', (req, res) => {
  console.log(req.body);
  res.send('register');
});

// 导出路由
module.exports = router;
