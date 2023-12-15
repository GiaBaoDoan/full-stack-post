const db = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
register = (req, res) => {
  //  check xem thử đã tồn tại user đó hay chưa nếu chưa thì ta add vào d
  const q = "SELECT * FROM user WHERE email = ? or userName = ?";
  db.query(q, [req.body.email, req.body.userName], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists");
    //   chuyển đổi password từ văn bản thô thành mã hóa các kỹ tự
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const q = "INSERT INTO user(`password`,`email`,`userName`) VALUES(?)";
    const values = [hash, req.body.email, req.body.userName];
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created ");
    });
  });
};
login = (req, res) => {
  const q = "SELECT * FROM user WHERE userName = ?";
  const value = req.body.userName;
  db.query(q, [value], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0)
      return res.status(404).json("Không tìm thấy người dùng");
    const isCorrectPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!isCorrectPassword)
      return res.status(400).json("Wrong username or password");
    const { password, ...other } = data[0];
    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    //  dùng đoạn trên để có thể ẩn đi giá trị ta muốn thành text thô với key = 'jwtkey'
    // cách decode lại token dưới cookies thì ta sẽ dùng đoạn code :
    // const decoded = jwt.verify(token, secretKey);
    //  bước này là thủ tục để setToken xuống cookies
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};
logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out");
};
module.exports = { login, register, logout };
