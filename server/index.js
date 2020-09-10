const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const config = require("./config/key");
const { User } = require("./models/User");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cookieParser());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello Express! 안녕?");
});

app.post("/api/users/register", (req, res) => {
  //client에서 사용자 정보를 받아와서
  //데이터 베이스에 저장한다

  User.findOne({ email: req.body.email }, function (err, user) {
    if (user) {
      return res.status(200).json({
        Success: false,
        message: "이미 존재하는 이메일입니다.",
      });
    } else {
      const user = new User(req.body);
      user.save((err, userInfo) => {
        if (err) res.send({ Success: false, err });
        res.status(200).send({
          Success: true,
        });
      });
    }
    //여기에서 save 되기전에 비밀번호가 암호화되어서 DB에 들어가게 하기 위해서 save전에 비밀번호를 암호화하고 집어넣는다.
  });
});

app.post("/api/users/login", (req, res) => {
  //입력한 이메일이 DB에 있는지 확인하기.

  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user)
      return res.status(200).json({
        loginSuccess: false,
        message: "찾고자 하는 이메일이 없습니다.",
      });
    //이메일이 존재한다면 비밀번호가 맞는지 확인하기

    user.comparePassword(req.body.password, function (err, isMatch) {
      //비밀번호가 다르다면?
      if (!isMatch)
        return res.status(200).json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      //비밀번호가 맞다면  사용자에게 토큰을 생성하여 주기 jsonwebtoken 이용해서 토큰주기.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  //여기 까지 온거면 auth 통과하고 온거임 ㅋ

  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role == 1 ? true : false,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    lastname: req.user.lastname,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

app.get("/api/hello", (req, res) => {
  res.send("hello axios?");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
