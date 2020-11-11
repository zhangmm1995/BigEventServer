// 封装sql数据库的调用
const mysql = require('mysql');

module.exports = (sql, params = null) => {
  // 创建连接
  const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'mydatabase',
  });

  return new Promise((resolve, reject) => {
    //连接数据库
    conn.connect();

    // 查询数据库
    conn.query(sql, params, (err, result) => {
      err ? reject(err) : resolve(result);
    });

    // 断开数据库
    conn.end();
  }).catch((err) => {
    console.log(err); // 输出promis已拒绝错误信息;
  });
};
