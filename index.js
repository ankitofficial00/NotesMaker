const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// set the view engine for express
app.set("view engine", "ejs");
// Routes

app.get("/", (req, res) => {
  fs.readdir(`./files`, function (err, files) {
    if (err) throw err;
    console.log(files);
    res.render("index", { files: files });
  });
});

app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    function (err) {
      if (err) throw err;
      res.redirect("/");
    }
  );
});

app.listen(8000, (req, res) => {
  console.log("server is running");
});
