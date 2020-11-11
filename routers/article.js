const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const moment = require('moment');
// 引用数据库
const database = require('../database');

//配置上传文件的存放目录,使用绝对路径
const upload = multer({ dest: path.join(__dirname, '../upload') });

// 发布文章j接口
router.post('/article/add', upload.single('cover_img'), async (req, res) => {
  let obj = req.body;
  obj.cover_img = req.file.filename;
  obj.pub_date = moment().format('YYYY-MM-DD hh:mm:ss');
  obj.author_id = req.user.id;
  let value = await database('insert into article set?', obj);
  if (value && value.affectedRows > 0) {
    res.json({
      status: 0,
      message: '发布文章成功！',
    });
  } else {
    res.json({
      status: 1,
      message: '发布文章失败！',
    });
  }
});

// 导出路由
module.exports = router;
