const express = require("express");
const router = express.Router();
const {
  getPost,
  getSinglePost,
  addPost,
  deletePost,
  updatePost,
} = require("../controllers/posts");
router.get("/", getPost);
router.get("/:id", getSinglePost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);
module.exports = router;
