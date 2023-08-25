const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_CODE)
  .then(() => {
    console.log("연결완료");
  })
  .catch((err) => {
    console.error("연결오류", err);
  });

app.get("/", (req, res, next) => {
  // 비동기 요청에 의한 에러를 처리하기 위해 에러처리기 또한 비동기로 만듬
  setImmediate(() => {
    next(new Error("오류가 발생했습니다."));
  });
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

// /users 경로로 요청이 왔을 때 routes/users 경로로 전달해줌
app.use("/users", require("./routes/users"));

// /products 경로로 요청이 왔을 때 routes/products 경로로 전달해줌
app.use("/products", require("./routes/products"));

app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`${port}번에서 실행이 되었습니다.`);
});

// 에러발생시 에러처리
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send(error.message || "서버에 오류가 발생했습니다.");
});
