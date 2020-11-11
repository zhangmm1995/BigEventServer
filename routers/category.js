const express = require('express');
const router = express.Router();
// 引用数据库
const database = require('../database');

// 获取文章分类列表接口
router.get('/article/cates', async (req, res) => {
  let value = await database('select * from category');
  if (value && value.length > 0) {
    res.json({
      status: 0,
      message: '获取文章分类列表成功！',
      data: value,
    });
  } else {
    es.json({
      status: 1,
      message: '获取文章分类列表失败！',
    });
  }
});

// 新增文章分类接口
router.post('/article/addcates', async (req, res) => {
  let data = req.body;
  let value = await database('insert into category set ?', data);
  if (value && value.affectedRows > 0) {
    res.json({
      status: 0,
      message: '新增文章分类成功！',
    });
  } else {
    res.json({
      status: 1,
      message: '新增文章分类失败！',
    });
  }
});

// 根据id删除文章分类
router.get('/article/deletecate/:id', async (req, res) => {
  let value = await database('delete from category where id=?', req.params.id);
  if (value && value.affectedRows > 0) {
    res.json({
      status: 0,
      message: '删除文章分类成功！',
    });
  } else {
    res.json({
      status: 1,
      message: '删除文章分类失败！',
    });
  }
});

// 根据id获取文章分类
router.get('/article/cates/:id', async (req, res) => {
  let value = await database(
    'select * from category where id=?',
    req.params.id
  );

  if (value && value.length > 0) {
    res.json({
      status: 0,
      message: '获取文章分类数据成功！',
      data: value[0],
    });
  } else {
    res.json({
      status: 1,
      message: '获取文章分类数据失败！',
    });
  }
});

// 根据 id 更新文章分类数据
router.post('/article/updatecate', async (req, res) => {
  let obj = {
    name: req.body.name,
    alias: req.body.alias,
  };
  let value = await database('update category set? where id=?', [
    obj,
    req.body.id,
  ]);
  if (value && value.affectedRows > 0) {
    res.json({
      status: 0,
      message: '更新分类信息成功！',
    });
  } else {
    res.json({
      status: 1,
      message: '更新分类信息失败！',
    });
  }
});

// 导出路由
module.exports = router;
