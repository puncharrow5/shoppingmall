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

router.get("/", async (req, res, next) => {
  // desc(descending) = 내림차순
  const order = req.query.order ? req.query.order : "desc";

  // id로 정렬
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  const limit = req.query.limit ? Number(req.query.limit) : 20;

  const skip = req.query.skip ? Number(req.query.skip) : 0;

  const searchTerm = req.query.searchTerm;

  let findArgs = {};
  for (let key in req.query.filters) {
    if (req.query.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          // 몽고DB에서 사용 할 수 있는 쿼리 옵션($gte = 이상)
          $gte: req.query.filters[key][0],
          // 몽고DB에서 사용 할 수 있는 쿼리 옵션($lte = 이하)
          $lte: req.query.filters[key][1],
        };
      } else {
        findArgs[key] = req.query.filters[key];
      }
    }
  }

  if (searchTerm) {
    // 몽고DB의 $search 기능으로 searchTerm을 키워드로 검색
    findArgs["$text"] = { $search: searchTerm };
  }

  try {
    // find(findArgs) 메소드를 통해 findArgs의 데이터에 해당하는 상품들만 데이터베이스에서 products 컬렉션에서 검색함
    const products = await Product.find(findArgs)
      // populate 메소드(몽고DB 메소드)를 통해 데이터베이스에 저장된 writer의 id 뿐만 아니라 writer의 모든 유저데이터들을 갖고옴
      .populate("writer")
      // 내림차순으로 정렬
      .sort([[order]])
      // 어디서부터 데이터를 가져오는지에 대한 위치(몽고DB 메소드)
      .skip(skip)
      // 한번에 얼마나 많은 데이터를 가져오는지(몽고DB 메소드)
      .limit(limit);

    // 전체 document의 숫자
    const productsTotal = await Product.countDocuments(findArgs);
    // skip + limit이 전체 document보다 적으면 hasMore이 true가 되면서 더보기 생성
    const hasMore = skip + limit < productsTotal ? true : false;

    return res.status(200).json({
      products,
      hasMore,
    });
  } catch (error) {
    next(error);
  }
});

// 상품 이미지 업로드(auth 미들웨어 거쳐감)
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

// 상품의 데이터를 데이터베이스에 저장(auth 미들웨어 거쳐감)
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
