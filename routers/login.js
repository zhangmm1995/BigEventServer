const express = require('express');
const router = express.Router();
// 引用数据库
const database = require('../database');
// 引用加密模块
const utility = require('utility');
// 引入jwt模块
const jwt = require('jsonwebtoken');

// 用户注册接口
router.post('/reguser', async (req, res) => {
  let data = req.body;
  // 密码加密
  data.password = utility.md5(data.password);
  // 查询数据库
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
router.post('/login', async (req, res) => {
  let data = req.body;
  let value = await database(
    'select * from user where username=? and password=?',
    [data.username, utility.md5(data.password)]
  );
  // 如果密码或者账户不匹配就会返回一个空数组
  if (value && value.length > 0) {
    res.json({
      status: 0,
      message: '登录成功！',
      token:
        'Bearer ' +
        jwt.sign(
          { username: data.username, id: value[0].id },
          'bigevent-9760',
          {
            expiresIn: '1h',
          }
        ),
    });
  } else {
    res.json({
      status: 1,
      message: '登录失败！',
    });
  }
});

// 导出路由
module.exports = router;
