const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = express.Router();

//데이터베이스에 아래 데이터들을 저장
router.post("/register", async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    // 몽고DB의 document에서 해당 유저가 존재하는지 findOne메소드를 이용해 체크
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Auth failed, email not found");
    }

    // 비밀번호가 올바르게 입력되었는지 체크
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send("Wrong password!");
    }

    // 토큰 생성을 위한 payload 생성
    const payload = {
      // 몽고DB의 id는 objectId 형태로 저장되어 있기 때문에 24바이트의 ehex 문자열로 변환
      userId: user._id.toHexString(),
    };

    // 토큰 생성, 토큰 3시간동안 유지
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    // 클라이언트로 user데이터와 토큰 보내줌(userSlice의 action.payload 부분)
    return res.json({ user, accessToken });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", auth, async (req, res, next) => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.get("/auth", auth, async (req, res) => {
  // 토큰 유효성 검사 후 middleware에서 user의 데이터를 가져옴
  return res.json({
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
  });
});

module.exports = router;
