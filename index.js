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
  console.log(req.body.title);
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

app.get("/file/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, data) {
    console.log(data);
    res.render("show", { filename: req.params.filename, details: data });
  });
});

app.get("/edit/:filename", (req, res) => {
  res.render("edit", { filename: req.params.filename });
});

app.post("/edit", (req, res) => {
  console.log(req.body);
  fs.rename(
    `./files/${req.body.previous}`,
    `./files/${req.body.new}`,
    (err) => {
      if (err) throw err;
      res.redirect("/");
    }
  );
});

app.get("/update/details/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, data) => {
    if (err) throw err;
    res.render("update", { details: data, filename: req.params.filename });
  });
});

app.post("/update/:filename", (req, res) => {
  console.log(req.body);
  fs.writeFile(
    `./files/${req.params.filename}`,
    req.body.newData,
    function (err) {
      if (err) throw err;
      res.redirect(`/file/${req.params.filename}`);
    }
  );
});

app.listen(8000, (req, res) => {
  console.log("server is running");
});
