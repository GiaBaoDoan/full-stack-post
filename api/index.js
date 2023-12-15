const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const routerPost = require("./routes/posts");
const routerAuth = require("./routes/auth");
const routerUsers = require("./routes/users");
const multer = require("multer");
app.use(express.json());
app.use(cookieParser());
//  cấu hình đường dẫn và tên file vào thẳng thư mục client
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
// sau khi file truyền xuống sẽ tự tạo ra folder với file đó
app.post("/api/upload", upload.single("file"), (req, res, next) => {
  const file = req.file;
  res.status(200).json(file?.filename);
});
app.use("/api/post", routerPost);
app.use("/api/auth", routerAuth);
app.use("/api/users", routerUsers);
app.listen(8080, () => {
  console.log("conected with backend");
});
