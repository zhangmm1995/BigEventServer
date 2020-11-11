const express = require('express');
const app = express();

// 引用数据库
const database = require('./database');

// 配置服务器
app.listen(8001, () => console.log('大事件服务器启动'));
