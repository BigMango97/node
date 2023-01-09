const express = require("express");
const app = express();

app.listen(8080, function (req, res) {
  console.log("listening on 8080");
});

app.get("/pet", function (req, res) {
  res.send("펫 관련 페이지 입니다.");
});

app.get("/beauty", function (req, res) {
  res.send("뷰티 관련 페이지 입니다.");
});
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/write", function (req, res) {
  res.sendFile(__dirname + "/write.html");
});
