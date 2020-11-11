const utility = require('utility');
const express = require('express');
const router = express.Router();
// 引用数据库
const database = require('../database');

// 获取用户的基本信息路由
router.get('/userinfo', async (req, res) => {
  let username = req.user.username;
  let value = await database('select * from user where username=?', username);
  if (value && value.length > 0) {
    res.json({
      status: 0,
      message: '获取用户基本信息成功！',
      data: value[0],
    });
  } else {
    res.json({
      status: 1,
      message: '获取用户基本信息失败！',
    });
  }
});

// 

// 导出路由
module.exports = router;
