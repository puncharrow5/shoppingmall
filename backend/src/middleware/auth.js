const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  // request headers의 authoriztion 필드에서 토큰을 가져옴
  const authHeader = req.headers["authorization"];

  // authHeader에서 " " 기준으로 나눠 1번째 인덱스의 토큰만 가져옴
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  try {
    // 유효한 토큰인지 확인
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // 데이터베이스에서 해당 유저의 id와 일치하는 유저를 찾음
    const user = await User.findOne({ _id: decode.userId });

    // 일치하는 유저 없을경우
    if (!user) {
      return res.status(400).send("존재하지 않는 사용자입니다.");
    }

    // 유저가 확인 될 경우 user propery 안에 user의 데이터를 넣어줌
    req.user = user;

    // middleware에서 벗어남
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
