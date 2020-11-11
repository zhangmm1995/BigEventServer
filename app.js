const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const expressJWT = require('express-jwt');

// unless ： 如果没有 unless方法，则默认所有接口都需要验证，unless把不需要验证的接口排除掉。
/* 
secret : 加密秘钥
algorithms ： 加密算法 ['HS256']
path 取值范围：
  字符串：表示排除一个地址 如 '/api/login'
  数组： 表示排除多个地址 如 ['/api/login', ]
  正则： 表示排除符合规则的地址 如 /^\/api/  (排除以 /api开头的接口)
*/
// （此方法写在静态资源加载之后，不然静态资源不能访问）
app.use(
  expressJWT({ secret: 'bigevent-9760', algorithms: ['HS256'] }).unless({
    path: /^\/api/,
  })
);

// 配置服务器
app.listen(8001, () => console.log('大事件服务器启动'));

// 配置跨域
app.use(cors());

// 设置获取post请求体参数
app.use(express.urlencoded({ extended: false }));

// 使用注册登录路由
app.use('/api', require(path.join(__dirname, 'routers', 'login')));

// 使用个人中心路由
app.use('/my', require(path.join(__dirname, 'routers', 'user')));
