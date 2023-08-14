const express = require("express");
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // 파일명은 현재시각 또는 원래의 파일명
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

// 상품 이미지 업로드
router.post("/image", auth, async (req, res, next) => {
  upload(req, res, (err) => {
    // 파일 업로드 도중 에러 발생시
    if (err) {
      return res.status(500).send(err);
    }
    // 파일 업로드 완료 시
    return res.json({ fileName: res.req.file.filename });
  });
});

router.post("/", auth, async (req, res, next) => {
  try {
    const product = new Product(req.body);
    product.save();
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
