const utility = require('utility');
const express = require('express');
const router = express.Router();
// 引用数据库
const database = require('../database');

// 获取用户的基本信息接口
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

// 更新用户信息接口
router.post('/userinfo', async (req, res) => {
  let data = {
    nickname: req.body.nickname,
    email: req.body.email,
  };
  let value = await database('update user set? where id=? ', [
    data,
    req.body.id,
  ]);
  console.log(value);
  if (value && value.affectedRows > 0) {
    res.json({
      status: 0,
      message: '修改用户信息成功！',
    });
  } else {
    res.json({
      status: 1,
      message: '修改用户信息失败！',
    });
  }
});

// 导出路由
module.exports = router;
