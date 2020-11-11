const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');

// 引用数据库
const database = require('./database');

// 配置服务器
app.listen(8001, () => console.log('大事件服务器启动'));

// 配置跨域
app.use(cors());

// 设置获取post请求体参数
app.use(express.urlencoded({ extended: false }));

// 使用注册路由
app.use('/api', require(path.join(__dirname, 'routers', 'login')));
