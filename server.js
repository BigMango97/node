const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
const MongoClient = require("mongodb").MongoClient;
app.set("view engine", "ejs");

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
  res.render("index.ejs");
});

app.get("/write", (req, res) => {
  res.render("write.ejs");
});
// 어떤사람이 post 요청하면(폼전송하면)
app.post("/add", (req, res) => {
  res.redirect("/list");
  db.collection("counter").findOne(
    { name: "게시물갯수" },
    function (error, result) {
      var 총게시물갯수 = result.totalPost;

      db.collection("post").insertOne(
        { _id: 총게시물갯수 + 1, 제목: req.body.title, 날짜: req.body.date },
        function (error, result) {
          console.log("저장완료");
        }
      );
      //+ counter라는 콜렉션에 있는 totalPost라는 항목도 1 증가시켜야함
      db.collection("counter").updateOne(
        { name: "게시물갯수" },
        { $inc: { totalPost: 1 } },
        function (error, result) {
          if (error) {
            return console.log(error);
          }
        }
      );
    }
  );
});
// /list로 GET요청으로 접속하면 HTML을 보여줌
app.get("/list", (req, res) => {
  //디비에 저장된 post라는 collection안의 모든데이터를 꺼내주세요
  db.collection("post")
    .find()
    .toArray(function (error, result) {
      res.render("list.ejs", { posts: result });
    });
});

app.delete("/delete", function (req, res) {
  console.log(req.body);
  req.body._id = parseInt(req.body._id);
  db.collection("post").deleteOne(req.body, function (error, result) {
    console.log("삭제완료");
    res.status(200).send({ message: "성공했습니다" });
  });
});

app.get("/detail/:id", (req, res) => {
  db.collection("post").findOne(
    { _id: parseInt(req.params.id) },
    function (error, result) {
      res.render("detail.ejs", { data: result });
    }
  );
});
