const express = require('express');
const router = express.Router();
// 引用数据库
const database = require('../database');
// 引用加密模块
const utility = require('utility');

// 用户注册接口
router.post('/reguser', async (req, res) => {
  let data = req.body;
  data.password = utility.md5(data.password);

  let value = await database('insert into user set ?', data);
  if (value && value.affectedRows > 0) {
    res.json({
      status: 0,
      message: '注册成功！',
    });
  } else {
    res.json({
      status: 1,
      message: '注册失败！',
    });
  }
});
// 用户登录接口
router.post('/login', async (req, res) => {});

// 导出路由
module.exports = router;
