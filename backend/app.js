const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const db = require("./models");
const passport = require("passport");
const passportConfig = require("./passport");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const userRouter = require("./routes/user");

const app = express();
// npx sequelize db:create  //데이터베이스 생성
db.sequelize
  .sync()
  .then(() => {
    console.log("app.js | DB연결 성공...");
  })
  .catch(console.error);
passportConfig();

// 앱 미들웨어
app.use(express.json()); //req.body에 json데이터 저장
app.use(express.urlencoded({ extended: true })); //req.body에 formData 저장
// Cross Origin Resource Service(?) 문제 해결
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser(process.env.COOKIE_HASH_KEY));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_HASH_KEY,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.status(201).send("서버 살아 있음!");
});

app.use("/user", userRouter);

app.listen(3070, () => {
  console.log("BackEnd Server Running!!");
});

// app.js 를 실행을 하면 node 런타임이 code를 실행해서 http가 서버역할을 해준다.
