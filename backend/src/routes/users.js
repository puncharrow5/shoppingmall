const express = require("express");
const User = require("../models/user");
const router = express.Router();

//데이터베이스에 아래 데이터들을 저장
router.post("/regsister", async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
