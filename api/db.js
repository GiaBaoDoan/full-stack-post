// tạo cơ sở dữ liệu bằng mySql2
const mysql = require("mysql2");
db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "giabaod2003",
  database: "post",
});
module.exports = db;
