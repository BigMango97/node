const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const MongoClient = require("mongodb").MongoClient;

var db;
MongoClient.connect(
  "mongodb+srv://admin:1234@cluster0.wq3mn5k.mongodb.net/?retryWrites=true&w=majority",
  function (error, client) {
    if (error) return console.log(에러);
    db = client.db("todoapp");
    db.collection("post").insertOne(
      { _id: 1, 제목: "jone", 날짜: "11/19" },
      function (error, result) {
        console.log("저장완료");
      }
    );
    //서버띄우는 코드 여기로 옮기기
    app.listen(8080, () => {
      console.log("listening on 8080");
    });
  }
);

app.get("/pet", (req, res) => {
  res.send("펫 관련 페이지 입니다.");
});

app.get("/beauty", (req, res) => {
  res.send("뷰티 관련 페이지 입니다.");
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/write", (req, res) => {
  res.sendFile(__dirname + "/write.html");
});

app.post("/add", (req, res) => {
  res.send("전송완료");
  console.log(req.body.title);
  console.log(req.body.date);
});
