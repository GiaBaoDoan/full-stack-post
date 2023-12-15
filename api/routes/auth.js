const express = require("express");
const router = express.Router();
const obj = require("../controllers/auth.js");
const { register, login, logout } = obj;
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
module.exports = router;
