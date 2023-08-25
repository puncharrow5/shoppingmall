const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Product = require("../models/Product");
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

// 토큰 유효성 검사 후 middleware에서 user의 데이터를 클라이언트로 보내줌
router.get("/auth", auth, async (req, res) => {
  return res.json({
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history,
  });
});

router.post("/cart", auth, async (req, res, next) => {
  try {
    // User collection에서 해당 유저의 정보 가져옴
    const userInfo = await User.findOne({ _id: req.user._id });

    // 유저 정보 중 cart에 해당 상품 있는지 확인
    let duplicate = false;
    userInfo.cart.forEach((item) => {
      if (item.id === req.body.productId) {
        duplicate = true;
      }
    });

    // cart에 해당 상품 있을 경우
    if (duplicate) {
      const user = await User.findOneAndUpdate(
        // 유저 데이터를 id로 찾음
        { _id: req.user._id, "cart.id": req.body.productId },
        // 유저 데이터를 업데이트($inc는 mongoDB의 연산자로 document의 field값을 증가 or 감소시킴. $inc( field : 변화시킬 숫자))
        { $inc: { "cart.$.quantity": 1 } },
        // 옵션 추가해줌(업데이트 이후 duplicate는 true)
        { new: true }
      );

      return res.status(201).send(user.cart);
    }
    // cart에 해당 상품 없을 경우
    else {
      const user = await User.findOneAndUpdate(
        // 유저 데이터를 찾음
        { _id: req.user._id },
        // 유저 데이터중 cart에 아래의 데이터들을 추가해줌($push는 mongoDB의 연산자로 새로운 배열을 생성하거나, 이미 존재할 경우 배열 끝에 요소를 새로 추가)
        {
          $push: {
            cart: {
              id: req.body.productId,
              title: req.body.productTitle,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        // 옵션 추가해줌(업데이트 이후 duplicate를 true)
        { new: true }
      );
      return res.status(201).send(user.cart);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/cart", auth, async (req, res, next) => {
  try {
    // cart 안에 지우려고 하는 상품 지움
    const userInfo = await User.findOneAndUpdate(
      // 유저 데이터를 id로 찾음
      { _id: req.user._id },
      // $pull은 mongoDB의 연산자로 특정 값 또는 document를 제거
      {
        $pull: { cart: { id: req.query.productId } },
      },
      { new: true }
    );

    // cart에 바뀐 데이터(productId)로 다시 넣어줌
    const cart = userInfo.cart;
    // array에 cart에 들어있는 productId들을 넣어줌
    const array = cart.map((item) => {
      return item.id;
    });

    const productInfo = await Product
      // array에 있는 productId에 맞는 product 데이터들을 가져옴($in은 특정 key의 값을 갖는 데이터들을 가져옴. 여기선 array, 즉 _id가 array에 있는 productId인 데이터를 가져옴)
      .find({ _id: { $in: array } })
      // writer의 데이터 또한 가져옴
      .populate("writer");

    return res.json({
      productInfo,
      cart,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
