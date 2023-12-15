const jwt = require("jsonwebtoken");
const db = require("../db.js");
getPost = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat = ?"
    : "SELECT * FROM posts";
  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};
getSinglePost = (req, res) => {
  // kết nối 2 tables và chọn ra các thuộc tính chung dựa uid của table post và id của table user
  const q =
    "SELECT `userName`,`title`,`desc`,p.img,`date`,`cat` FROM user u JOIN posts p ON u.id = p.uid   WHERE p.id =?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data[0]);
  });
};

deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Không có quyền truy cập");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token không tồn tại");
    //  chỉ có thể xóa bài viết của bạn
    const q = "DELETE  FROM posts WHERE `id` = ? AND `uid` = ?";
    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("không được xóa");
      return res.status(200).json("Bài viết cảu bạn đã được xóa !");
    });
  });
};
addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Không có quyền truy cập");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token không tồn tại");
    const q =
      "INSERT INTO posts(`title`,`desc`,`img`,`uid`,`date`,`cat`) VALUES(?)";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      userInfo.id,
      req.body.date,
      req.body.cat,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("Đăng bài thành công!");
    });
  });
};
updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Không có quyền truy cập");
  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token không tồn tại");
    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title` =?,`desc` =?,`img` =?,`date` =?,`cat` =? WHERE `id` = ? AND `uid`=?";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.date,
      req.body.cat,
    ];
    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Cập nhật bài thành công!");
    });
  });
};

module.exports = { getPost, getSinglePost, addPost, deletePost, updatePost };
